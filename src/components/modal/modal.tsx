import { getFocusableElementsWithin } from "../../tools";
import cancel from "../../assets/cancel.svg";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./modal.css";

interface Focusable {
  focus: () => void;
}

export interface ModalProps {
  /** Whether the dialog should be open or closed. */
  isOpen: boolean;
  /** A function which will close the modal dialog. */
  close: () => void;
  /** Assistive technology label. */
  ariaLabel: string;
  /** An element to return focus to after the modal is closed. */
  returnFocusToElement: Focusable;
  bodyClassName?: string;
}

/** Reusable modal with a close button. Traps the focus within itself. Close button is the first element to receive focus.*/
export function Modal(props: React.PropsWithChildren<ModalProps>) {
  React.useEffect(() => {
    if (props.isOpen) {
      setInitialFocus();
    }
  }, [props.isOpen]);

  const modal = React.useRef(null);
  const closeButton = React.useRef<HTMLButtonElement>(null);

  if (!props.isOpen) return null;

  function Close() {
    props.close();
    props.returnFocusToElement.focus();
  }

  const setInitialFocus = () => {
    closeButton.current!.focus();
  };

  // The keyboard interactions follow WAI-ARIA best practices as per https://www.w3.org/TR/wai-aria-practices/#dialog_modal
  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      Close();
      event.preventDefault();
    }

    // Trap the focus within the modal
    if (event.key === "Tab") {
      // At least one focusable element is guaranteed to exist within the modal - the close button.
      const focusableElements = getFocusableElementsWithin(modal.current!);
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const lastFocusableElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastFocusableElement
      ) {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  };

  return ReactDOM.createPortal(
    <div
      ref={modal}
      role="dialog"
      aria-modal="true"
      aria-label={props.ariaLabel}
      onKeyDown={(e) => handleOnKeyDown(e)}
      className="modal"
    >
      <div className="modal-content" >
        <div className="modal-header">
          <button
            className = "modal-close-button"
            onClick={Close}
            ref={closeButton}
            aria-label={"Close the modal"}
          >
            <img className="modal-close-image" src={cancel} alt="" role="presentation" />
          </button>
        </div>
        <div className={props.bodyClassName}>{props.children}</div>
      </div>
    </div>,
    document.body
  );
}

/** Reusable component to manage the open/close states of the modal and preserve the original window position. */
export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // The hook is used to preserve the position of the window prior to opening (and after closing) the modal as per
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    if (isOpen) {
      const currentScrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
    } else {
      const currentTop = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(currentTop || "0") * -1);
    }
  }, [isOpen]);

  return {
    isOpen: isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
