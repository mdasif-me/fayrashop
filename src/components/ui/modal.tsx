"use client"

import type { DialogProps, DialogTriggerProps, ModalOverlayProps } from "react-aria-components"
import {
  composeRenderProps,
  DialogTrigger as DialogTriggerPrimitive,
  Modal as ModalPrimitive,
  ModalOverlay,
} from "react-aria-components"
import { twJoin } from "tailwind-merge"
import { tv } from "tailwind-variants"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const modalContentStyles = tv({
  base: [
    "fixed z-50 grid w-full max-w-lg gap-4 border-muted-fg/20 bg-overlay text-overlay-fg shadow-lg dark:border-border",
    "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
    "transform-gpu transition ease-in-out will-change-transform",
    "rounded-2xl border",
  ],
  variants: {
    isEntering: {
      true: "animate-in fade-in-0 zoom-in-95 duration-200",
    },
    isExiting: {
      true: "animate-out fade-out-0 zoom-out-95 duration-200",
    },
  },
})

type ModalProps = DialogTriggerProps
const Modal = (props: ModalProps) => {
  return <DialogTriggerPrimitive {...props} />
}

interface ModalContentProps
  extends Omit<ModalOverlayProps, "children">,
    Pick<DialogProps, "aria-label" | "role" | "aria-labelledby" | "children"> {
  closeButton?: boolean
  isBlurred?: boolean
  overlay?: Omit<ModalOverlayProps, "children">
}

const ModalContent = ({
  className,
  isBlurred = false,
  isDismissable: isDismissableInternal,
  role = "dialog",
  closeButton = true,
  overlay,
  children,
  ...props
}: ModalContentProps) => {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog"
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={twJoin(
        "fixed inset-0 z-50 h-(--visual-viewport-height,100vh) w-screen overflow-hidden bg-black/15",
        "entering:fade-in-0 entering:animate-in entering:duration-200",
        "exiting:fade-out-0 exiting:animate-out exiting:duration-200",
        isBlurred && "backdrop-blur-sm backdrop-filter",
      )}
      {...props}
    >
      <ModalPrimitive
        className={composeRenderProps(className, (className, renderProps) =>
          modalContentStyles({
            ...renderProps,
            className,
          }),
        )}
      >
        <Dialog aria-label={props["aria-label"]} role={role}>
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && (
                <DialogCloseIcon className="top-2.5 right-2.5" isDismissable={isDismissable} />
              )}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  )
}

const ModalTrigger = DialogTrigger
const ModalFooter = DialogFooter
const ModalHeader = DialogHeader
const ModalTitle = DialogTitle
const ModalDescription = DialogDescription
const ModalBody = DialogBody
const ModalClose = DialogClose

Modal.Trigger = ModalTrigger
Modal.Footer = ModalFooter
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Description = ModalDescription
Modal.Body = ModalBody
Modal.Close = ModalClose
Modal.Content = ModalContent

export type { ModalProps, ModalContentProps }
export {
  Modal,
  ModalTrigger,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalClose,
  ModalContent,
}
