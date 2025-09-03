const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const allowedDefault = ["XS", "S", "M", "L", "XL", "XXL"];

const toEnum = (s) =>
  String(s || "")
    .toUpperCase()
    .replace(/\s+/g, "");

const isBrandLikelyValid = (s = "") => {
  const t = s.trim();
  if (t.length < 2 || t.length > 40) return false;

  const letters = (t.match(/[A-Za-zÅÄÖåäö]/g) || []).length;
  const punct = (t.match(/[^A-Za-zÅÄÖåäö0-9\s]/g) || []).length;
  return letters >= 2 && punct <= t.length / 2;
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  try {
    const {
      brand,
      bodyPart,
      valueCm,
      allowed = allowedDefault,
    } = JSON.parse(event.body || "{}");

    if (!brand || !bodyPart || typeof valueCm !== "number") {
      return json(400, { error: "Missing brand, bodyPart, or valueCm" });
    }

    const enumAllowed = allowed.map(toEnum);
    const sliderMin = 30;
    const sliderMax = 180;
    const outOfRange = valueCm < sliderMin || valueCm > sliderMax;
    const badBrand = !isBrandLikelyValid(brand);

    if (badBrand || outOfRange) {
      return json(200, { size: "X", reason: badBrand ? "brand" : "range" });
    }

    const functions = [
      {
        name: "return_size",
        description: "Return exactly one size token or X",
        parameters: {
          type: "object",
          properties: {
            size: {
              type: "string",
              enum: [...enumAllowed, "X"],
              description: "One of the allowed sizes or X if uncertain",
            },
          },
          required: ["size"],
          additionalProperties: false,
        },
      },
    ];

    const sys = [
      "You must choose a size only if clearly justified by brand + bodyPart + valueCm.",
      "If brand is unknown/irrelevant to sizing or data is insufficient/ambiguous, return X.",
      "Only use the provided enum.",
    ].join(" ");

    const user = [
      `allowed: ${enumAllowed.join(", ")}`,
      `brand: ${brand}`,
      `bodyPart: ${bodyPart}`,
      `valueCm: ${valueCm}`,
    ].join("\n");

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user },
      ],
      functions,
      function_call: { name: "return_size" },
    });

    const call = completion.choices?.[0]?.message?.function_call;
    const args = call?.arguments ? JSON.parse(call.arguments) : {};
    let size = toEnum(args?.size || "");

    if (!enumAllowed.includes(size)) size = "X";

    return json(200, { size });
  } catch (err) {
    console.error(err);
    return json(500, { size: "X", error: "Server error" });
  }
};
