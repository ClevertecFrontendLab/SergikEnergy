import { FC, useContext } from 'react';
import { Moment } from 'moment';
import { checkNarrowFramesDay } from './CustomCalendarModal.utils';
import { IModalPosition } from '@components/calendarWithData/CalendarWithData.types';
import { ITrainingsResponse } from '@redux/API/api-types';
import { ModalCreateTrain, ModalSelectExercise } from './components';
import { DrawerTrainsContext } from '../../reactContexts/drawerTrains-context';

import classes from './CustomCalendarModal.module.css';
import classnames from 'classnames';

export type ModalModeType = 'train' | 'exercise';
interface ICustomCalendarModalProps {
    widthModal: string;
    modalType: ModalModeType;
    modalPosition: IModalPosition;
    value: Moment;
    trains: [] | ITrainingsResponse[];
    isCentered?: boolean;
    allowOpen: boolean;
    isModalVisible: boolean;
    closeModal: () => void;
    changeModalType: (mode: ModalModeType) => void;
}

export const CustomCalendarModal: FC<ICustomCalendarModalProps> = ({
    allowOpen,
    modalPosition,
    value,
    widthModal,
    isCentered,
    isModalVisible,
    trains,
    modalType,
    changeModalType,
    closeModal,
}) => {
    const { allowedTrains } = useContext(DrawerTrainsContext);

    const existingTrainsFromCellData = trains.map((elem) => elem.name.toLocaleLowerCase());

    const allowedTrainsForCellCorrected =
        allowedTrains.length > 0
            ? allowedTrains.filter((elem) =>
                  !existingTrainsFromCellData.includes(elem.name.toLowerCase()) ? true : false,
              )
            : [];

    const topPosition = isCentered
        ? modalPosition.top + modalPosition.heightSelectedCell
        : modalPosition.top;

    const styleForCenteredPosition = {
        width: widthModal,
        top: topPosition,
        left: 24,
        zIndex: 11,
    };

    const styleForOtherPosition =
        checkNarrowFramesDay(value.day()).side === 'left'
            ? {
                  width: widthModal,
                  top: topPosition,
                  left: modalPosition.left,
                  zIndex: 11,
              }
            : {
                  width: widthModal,
                  top: topPosition,
                  right: modalPosition.right,
                  zIndex: 11,
              };

    return (
        <>
            {allowOpen && (
                <div
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    {modalType === 'train' && (
                        <ModalCreateTrain
                            disabledCreate={allowedTrainsForCellCorrected.length === 0}
                            value={value}
                            trains={trains}
                            closeModal={closeModal}
                            changeMode={changeModalType}
                        />
                    )}
                    {modalType === 'exercise' && (
                        <ModalSelectExercise
                            date={value}
                            allowedTrains={allowedTrainsForCellCorrected}
                            changeMode={changeModalType}
                            trains={trains}
                        />
                    )}
                </div>
            )}
        </>
    );
};