import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks/redux";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import Modal from "../../../UI/Modal";
import { CreateList } from "../../../../store/action/ListAction";

interface GetListButtonProps {
  boardId: number;
}

const CreateListButton: FC<GetListButtonProps> = ({ boardId }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  useEffect(() => {
    if (!isModalActive) {
      setTitle("");
      setContent("");
    }
  }, [isModalActive]);

  const handleSubmitModal = () => {
    if (title || content) {
      dispatch(CreateList(boardId, title, content));
    }
  };
  const isCreateButtonDisabled = title.length === 0;

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div className={styles.footerCard} onClick={handleModalOpen}>
        <img className={styles.plusCard} src="/img/Plus.svg" alt="+" />
        <div> Добавить карточку</div>
      </div>
      <div className={styles.modal}>
        {isModalActive ? (
          <Modal
            onClose={handleModalClose}
            footerButtons={[
              {
                name: "Сохранить",
                disabled: isCreateButtonDisabled,
                onClick: handleSubmitModal,
              },
              {
                name: "Отменить",
                disabled: false,
                onClick: handleModalClose,
              },
            ]}
            customPosition={{ top: "25%", left: "23%" }}
          >
            <input
              placeholder="Название списка"
              value={title}
              className={styles.inputModal}
              type="text"
              onChange={onTitleChange}
              required
            />
            <input
              placeholder="Контент"
              value={content}
              className={styles.inputModal}
              type="text"
              onChange={onContentChange}
              required
            />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default CreateListButton;
