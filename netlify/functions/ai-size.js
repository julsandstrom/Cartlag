const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const toEnum = (s) =>
  String(s || "")
    .toUpperCase()
    .replace(/\s+/g, "");

exports.handler = async (event) => {
  try {
    const {
      brand,
      bodyPart,
      valueCm,
      allowed = ["XS", "S", "M", "L", "XL", "XXL"],
    } = JSON.parse(event.body || "{}");

    if (!brand || !bodyPart || typeof valueCm !== "number") {
      return json(400, { error: "Missing brand, bodyPart, or valueCm" });
    }

    const prompt = [
      `Pick ONE clothing size from this list: ${allowed.join(", ")}`,
      `If uncertain or not applicable, return X.`,
      `Return ONLY the size token, nothing else.`,
      ``,
      `brand = ${brand}`,
      `bodyPart = ${bodyPart}`,
      `valueCm = ${valueCm}`,
    ].join("\n");

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        { role: "system", content: "You return only a single size token." },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";
    let size = toEnum(raw);

    const allowedSet = new Set(allowed.map(toEnum));
    if (!allowedSet.has(size)) size = "X";

    return json(200, { size });
  } catch (err) {
    console.error(err);
    return json(500, { size: "X", error: "Server error" });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
