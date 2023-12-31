import {AppDispatch} from "../index";
import ax from "../../utils/axios";
import {ICard, IResponse} from "../../lib/types";
import {cardSlice} from "../slices/CardSlice";

export const createCard =
  (nameCard: string, boardId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse<ICard>>(`/createСard`, {
        nameCard: nameCard,
        boardId: boardId,
      });
      const cardId = response.data.data?.id;
      if (cardId || response.status) {
        dispatch(cardSlice.actions.addCard(response.data.data!));
      }
    } catch (e) {}
  };

export const getCard =
  () =>
  async (dispatch: AppDispatch): Promise<ICard[]> => {
    try {
      const response = await ax.get<IResponse<ICard[]>>(`/getCard`);
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          if (response.data?.data !== undefined) {
            const cardData = response.data.data;
            dispatch(cardSlice.actions.setCard(cardData));
          }
        },
      };
      obj_action[response.data.statusCode]?.();
      return response.data?.data || [];
    } catch (e) {
      throw e;
    }
  };

export const deleteCard =
  (boardId: number, cardId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.delete<IResponse>(
        `/deleteCard?cardId=${cardId}&boarId=${boardId}`,
      );
      console.log(response);
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          dispatch(cardSlice.actions.removeCard(boardId));
        },
        // 2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        // 7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        // 9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.statusCode]?.();
    } catch (e) {}
  };
