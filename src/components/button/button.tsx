import "./button.css";

interface ButtonProps {
  buttonText: string;
  disabled?: boolean;
  // Reference to be set to the actual button.
  buttonRef?: React.RefObject<HTMLButtonElement>;
  ariaLabel?: string;
  className?: string;
  onClick: () => void;
}

/** Reusable button to ensure consistent styling. */
export function Button(props: ButtonProps) {
  return (
    <button
      className={`button${props.disabled ? " disabled" : ""}${
        props.className ? ` ${props.className}` : ""
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
      ref={props.buttonRef}
      aria-label={props.ariaLabel}
    >
      {props.buttonText}
    </button>
  );
}
