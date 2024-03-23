import { Modal } from "@mantine/core";

export default function CreateModal({
  opened,
  open,
  close,
  withCloseButton = true,
  closeOnClickOutside = true,
  children,
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={withCloseButton}
        closeOnClickOutside={closeOnClickOutside}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
        {children}
      </Modal>

      <style jsx global>
        {`
          .mantine-Modal-header {
            padding-bottom: 0px;
            padding-left: 16px;
            padding-right: 16px;
          }

          .mantine-Modal-body {
            padding-left: 32px;
            padding-right: 32px;
            padding-bottom: 32px;
          }

          .mantine-Modal-content {
            min-width: 544px;
            border-radius: 10px;
          }

          @media (max-width: 600px) {
            .mantine-Modal-content {
              min-width: 100%;
            }

            .mantine-Modal-body {
              padding-left: 18px;
              padding-right: 18px;
              padding-bottom: 18px;
            }
          }
        `}
      </style>
    </>
  );
}
