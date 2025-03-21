const CartlagDoll = ({
  handleClick,
  highlightedPart,
  selectedColor,
  secondaryColor,
  className = "",
}) => {
  return (
    <svg
      onClick={handleClick}
      id=""
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-30 -40 420 760"
      className={`cartlag-doll ${className}`}
    >
      <defs>
        <style></style>
      </defs>
      <path
        id="Feet"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        className={`cls-2 ${highlightedPart === "Feet" ? "highlight" : ""}`}
        d="M298.64,667.3c-6.95,6.73-26.72,7-44-2.43S237.5,642,236.54,635.11c3.82-12.46,23.85-2.07,42,5.54C301.41,646.88,305.59,660.58,298.64,667.3Z"
      />
      <path
        id="Feet"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="feet"
        className={`cls-2 ${highlightedPart === "Feet" ? "highlight" : ""}`}
        d="M202.14,688.71c-10.76.67-26.35-10.57-32.33-27.05s4.75-25.79,9.51-31.15c12.86-6.47,20.23,12.31,28.3,28C220.52,676.1,212.89,688,202.14,688.71Z"
      />
      <path
        id="Legs"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M207.39,485.33c0,6.74-9.42,12.21-21,12.21s-21-5.47-21-12.21,9.42-12.21,21-12.21S207.39,478.59,207.39,485.33Z"
      />
      <path
        id="Legs"
        style={{
          fill: secondaryColor,
        }}
        className={`cls-1 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M208.74,345.6c0,9.74-10.63,17.63-23.74,17.63s-23.74-7.89-23.74-17.63S171.89,328,185,328,208.74,335.86,208.74,345.6Z"
      />
      <path
        id="Legs"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M275.22,485.33c0,6.74-8.81,12.21-19.67,12.21s-19.68-5.47-19.68-12.21,8.81-12.21,19.68-12.21S275.22,478.59,275.22,485.33Z"
      />
      <path
        id="Legs"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M276.57,345.6c0,9.74-10.63,17.63-23.74,17.63s-23.74-7.89-23.74-17.63S239.72,328,252.83,328,276.57,335.86,276.57,345.6Z"
      />
      <path
        id="Waist"
        style={{ fill: secondaryColor }}
        className={`cls-1 ${highlightedPart === "Waist" ? "highlight" : ""}`}
        d="M268.43,248.6c0,14.61-21,26.46-46.8,26.46s-46.8-11.85-46.8-26.46,20.95-26.45,46.8-26.45S268.43,234,268.43,248.6Z"
      />
      <path
        id="Head"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        className={`cls-2 ${highlightedPart === "Head" ? "highlight" : ""}`}
        d="M267.83,62.44c-9.95,29.82-23.19,51.33-49.13,43.23-25.28.44-33.14-22.89-31.78-55.33,1.06-25.46,10.8-44.71,40-41.5C262.19,12.71,277.78,32.62,267.83,62.44Z"
      />{" "}
      <path
        id="Shoulder"
        style={{ fill: secondaryColor }}
        className={`cls-1 ${highlightedPart === "Shoulder" ? "highlight" : ""}`}
        d="M315.91,145.5c0,9.37-10.93,17-24.41,17s-24.42-7.59-24.42-17,10.93-17,24.42-17S315.91,136.13,315.91,145.5Z"
      />
      <path
        id="Shoulder"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Shoulder" ? "highlight" : ""}`}
        d="M158.42,172.2c-9.31,1-18-9.11-19.41-22.52s5-25.08,14.32-26.06,18,9.11,19.41,22.52S167.74,171.22,158.42,172.2Z"
      />
      <path
        id="Neck"
        style={{ fill: secondaryColor }}
        className={`cls-1 ${highlightedPart === "Neck" ? "highlight" : ""}`}
        d="M191.11,109.55a6.77,6.77,0,0,1,6.76-6.78h42.07a6.79,6.79,0,0,1,6.79,6.77h0V115a6.79,6.79,0,0,1-6.79,6.78H197.89a6.79,6.79,0,0,1-6.78-6.78Z"
      />
      <path
        id="Chest"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        className={`cls-2 ${highlightedPart === "Chest" ? "highlight" : ""}`}
        d="M161.18,146.94a20.84,20.84,0,0,1,20.4-25.18h72.63a23.1,23.1,0,0,1,22.71,27.33l-2,46.74a28.36,28.36,0,0,0,.51,6.63,27.84,27.84,0,0,1-27.31,33.25H190.5a29.6,29.6,0,0,1-29.6-29.58,30.16,30.16,0,0,1,.37-4.65,30,30,0,0,0,.37-4.64V151.27A21,21,0,0,0,161.18,146.94Z"
      />
      <path
        id="Hip"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="hip"
        className={`cls-2 ${highlightedPart === "Hip" ? "highlight" : ""}`}
        d="M170.14,271.25a24.34,24.34,0,0,1,21.2-11.87l61.93.91a25.59,25.59,0,0,1,24.79,20.84l.14.71,1.9,29.07a21.62,21.62,0,0,1-21.24,25.49H182.37A18.31,18.31,0,0,1,164,318.14a19,19,0,0,1,.24-3,17.88,17.88,0,0,0,.24-2.92V299.84l2.42-19.22A24.28,24.28,0,0,1,170.14,271.25Z"
      />
      <path
        id="Arms"
        style={{ fill: secondaryColor }}
        data-name="feet"
        className={`cls-1 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M58.44,150.57c-1.41-5.83-9-9-17-7s-13.44,8.19-12,14,9,9,17.05,7S59.85,156.39,58.44,150.57Z"
      />
      <path
        id="Arms"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M318.63,366c0,5.24-5.16,9.49-11.53,9.49s-11.53-4.25-11.53-9.49,5.16-9.5,11.53-9.5S318.63,360.7,318.63,366Z"
      />
      <path
        id="Arms"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M30.19,56.91c-1.23-5.1-6.66-8.16-12.12-6.84S9.18,56.6,10.41,61.7s6.66,8.15,12.13,6.83S31.42,62,30.19,56.91Z"
      />
      <path
        id="Arms"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M320.28,262.54c.76,6.09-4.62,11.42-12,11.91s-14-4-14.8-10.13,4.62-11.43,12-11.92S319.51,256.45,320.28,262.54Z"
      />
      <path
        id="Legs"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M202,632.52c0,5.62-6.68,10.18-14.92,10.18s-14.93-4.56-14.93-10.18,6.69-10.17,14.93-10.17S202,626.9,202,632.52Z"
      />
      <path
        id="Legs"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M273.86,632.52c0,5.62-7,10.18-15.6,10.18s-15.6-4.56-15.6-10.18,7-10.17,15.6-10.17S273.86,626.9,273.86,632.52Z"
      />
      <path
        id="Arms"
        style={{ fill: selectedColor }}
        className={`cls-2 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M136.39,126.07a7,7,0,0,1,8,5.9c0,.16,0,.32,0,.48L146.56,162a6.57,6.57,0,0,1-6,7.07,8.18,8.18,0,0,1-1,0l-7.27-.45-33.54,1.53-20.56-.66h-28a7,7,0,0,1-7-6.46l-1.51-20.55a6.55,6.55,0,0,1,6-7l27.8-2.57,20.33-2.52,33.42-3.13Z"
      />{" "}
      <path
        id="Hands"
        style={{ fill: selectedColor }}
        data-name="hands"
        className={`cls-2 ${highlightedPart === "Hands" ? "highlight" : ""}`}
        d="M3.46,50.54a6.55,6.55,0,0,0,7.43,5.51l.27,0,15.68-2.88a7,7,0,0,0,5.64-7.93l-3.37-22a6.55,6.55,0,0,0-7.44-5.52l-.26,0L5.72,20.57A7,7,0,0,0,.08,28.5Z"
      />
      <path
        id="Hands"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="none"
        className={`cls-2 ${highlightedPart === "Hands" ? "highlight" : ""}`}
        d="M292.56,379.49a6.44,6.44,0,0,1,5.74-7.07l.39,0,19.29-1a7.18,7.18,0,0,1,7.42,6.42L327.52,400a6.42,6.42,0,0,1-5.71,7.06l-.42,0-19.29,1a7.16,7.16,0,0,1-7.42-6.41Z"
      />
      <path
        id="Hands"
        style={{ fill: secondaryColor }}
        data-name="none"
        className={`cls-1 ${highlightedPart === "Hands" ? "highlight" : ""}`}
        d="M299.17,407.82l25.2-1.48,2,18.21L301.2,426Z"
      />
      <path
        id="Hands"
        style={{ fill: secondaryColor }}
        className={`cls-1 ${highlightedPart === "Hands" ? "highlight" : ""}`}
        d="M2.65,22,25,18.12,22.46,0,.13,3.88Z"
      />
      <path
        id="Arms"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="arms"
        className={`cls-2 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M276.23,162.47a6.55,6.55,0,0,1,5.63-7.36c.22,0,.44,0,.66-.05l30-1a7,7,0,0,1,7.24,6.75,4.34,4.34,0,0,1,0,.51l-.3,7.24.84,34.56,1.15,19.42.55,27.92a6.53,6.53,0,0,1-6.34,6.69l-20.58.72a7,7,0,0,1-7.2-6.22l-3.15-27.82-3-20.37-4.49-32.94Z"
      />
      <path
        id="Legs"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="lower legs"
        className={`cls-2 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M208.92,497.67a7.1,7.1,0,0,0-6.92-5.75H170.41a6.49,6.49,0,0,0-6.54,6.15l-.82,14.61-1,20.77,2.11,22.15,2.49,28.76,3,22.39v13.13a7.07,7.07,0,0,0,7,7h23a6.5,6.5,0,0,0,6.54-6.2l2-39.64,1.55-28.91v-49.2a6.75,6.75,0,0,0-.12-1.27Z"
      />
      <path
        id="Legs"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="lower legs"
        className={`cls-2 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M277.17,497.7a7.1,7.1,0,0,0-6.92-5.75H238.67a6.5,6.5,0,0,0-6.55,6.16l-.81,14.61v21l1.15,21.86,2.38,28L237,606.44l.95,10.79v2.68a7.07,7.07,0,0,0,7,7h21.9a6.49,6.49,0,0,0,6.54-6l3-39.82L278,552.18l1.63-20.48V513.24a5.55,5.55,0,0,0-.09-1L278,502.38Z"
      />
      <path
        id="Legs"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        className={`cls-2 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M283.92,363.94a6.68,6.68,0,0,0-6.67-6.69H233a6.88,6.88,0,0,0-6.87,6.86v29l2.47,20,3.56,23.71,2.8,32.57a6.78,6.78,0,0,0,.24,1.27l.61,2.15a6.68,6.68,0,0,0,6.44,4.84H269.5a6.89,6.89,0,0,0,6.86-6.53l1.58-32.23,2.87-25.78L283.92,380Z"
      />
      <path
        id="Legs"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="thigh"
        className={`cls-2 ${highlightedPart === "Legs" ? "highlight" : ""}`}
        d="M212.12,364.72a6.68,6.68,0,0,0-6.67-6.69H163.34a6.89,6.89,0,0,0-6.87,6.87v12.9l1,17.6,2.21,18.52,3.82,23.7,2.78,32.3a6.92,6.92,0,0,0,.4,1.79l.91,2.42a6.69,6.69,0,0,0,6.27,4.33h27a6.89,6.89,0,0,0,6.86-6.54l1.58-32.22,2.87-25.78Z"
      />
      <path
        id="Arms"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        className={`cls-2 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M22.89,145.47a6.84,6.84,0,0,0,7.85,5.65,5.41,5.41,0,0,0,.58-.12l20.47-5.22a6.73,6.73,0,0,0,4.87-8.18,6.18,6.18,0,0,0-.23-.73l-1.76-4.68-7.19-27.46L41.84,88.35l-6.7-21.6a6.85,6.85,0,0,0-8.21-4.6l-13.71,3.5A6.75,6.75,0,0,0,8.3,73.6l4.75,22.1,3.14,17.06,5.94,27.77Z"
      />
      <path
        id="Arms"
        style={{
          fill: selectedColor,
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
        }}
        data-name="arms"
        className={`cls-2 ${highlightedPart === "Arms" ? "highlight" : ""}`}
        d="M288.49,276a6.86,6.86,0,0,1,6.84-6.83h26.36a6.68,6.68,0,0,1,6.68,6l1,8.91-.06,27.83L327.6,330.6l-4.83,25.09a6.89,6.89,0,0,1-6.81,5.56L299.54,361a6.71,6.71,0,0,1-6.64-6.73V345.5l-1.82-14.93-2.62-18.2a8.4,8.4,0,0,1-.07-1Z"
      />
      <path
        id="Head"
        data-name="none"
        className="cls-3"
        d="M260.79,50.05c-1.85.93-3.49-4.53-6.93-11.41s-7.63-15.21-5.78-16.14,10.07,5.1,13.51,12S262.64,49.13,260.79,50.05Z"
      />
    </svg>
  );
};

export default CartlagDoll;
