import { MouseEvent } from "react";
import { Button } from "../ui/button";

type Props = {
  loading: boolean;
  confirmButtonVariant: "default" | "destructive";
  onCancel: () => void;
  onConfirm: (event: MouseEvent<HTMLElement>) => void;
};

export function ModalFooter({
  loading,
  confirmButtonVariant,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <>
      <Button
        variant={confirmButtonVariant}
        disabled={loading}
        onClick={onConfirm}
      >
        확인
      </Button>
      <Button disabled={loading} onClick={onCancel}>
        취소
      </Button>
    </>
  );
}
