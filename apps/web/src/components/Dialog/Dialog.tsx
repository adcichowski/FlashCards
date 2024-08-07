import { XIcon } from "lucide-react";
import * as DialogRadix from "@radix-ui/react-dialog";
import styles from "./Dialog.module.scss";
export const Dialog = ({
  children,
  title,
  trigger,
  manage,
}: {
  children: JSX.Element;
  title: string;
  trigger?: JSX.Element;
  manage?: {
    open: boolean;
    onOpenChange: () => void;
  };
}) => (
  <DialogRadix.Root modal={true} {...manage}>
    {trigger && <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>}
    <DialogRadix.Portal>
      <DialogRadix.Overlay className={styles.overlay} />
      <DialogRadix.Content className={styles.content}>
        <DialogRadix.Trigger className={styles.closeButton} autoFocus>
          <XIcon size={20} />
        </DialogRadix.Trigger>

        <DialogRadix.Title className={styles.title}>{title}</DialogRadix.Title>
        {children}
        <DialogRadix.Close />
      </DialogRadix.Content>
    </DialogRadix.Portal>
  </DialogRadix.Root>
);
