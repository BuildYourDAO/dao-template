import React, { useCallback, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'; // Drag and drop library
import { Button, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { TfiCup } from 'react-icons/tfi';

import { useUpdateTaskStatus } from '@/hooks/messages';
import { IGetTicket } from '@/hooks/messages/useGetTicketList';
import { useGetMembersTicket } from '@/hooks/useGetMembersTicketList';

import { LoadingSpinner } from '@/components/loading';
import { CreateTicket } from '@/components/tickets/CreateTicket';
import { SetConfidence } from '@/components/tickets/SetConfidence';
import {
  Ticket,
  TicketModal,
} from '@/components/tickets/TicketBoard/components';

import { useUser } from '@/context/user/UserContextProvider';

import { TaskStatusEnum } from '@/types/enums/taskStatus.enum';

interface BoardColumn {
  id: string;
  title: string;
  tickets: IGetTicket[];
}

interface TicketStatusesObjType {
  [key: string]: {
    taskStatus: TaskStatusEnum;
    columnIndex: number;
  };
}

const allColumns: BoardColumn[] = Object.keys(TaskStatusEnum).map(
  (ticketType) => ({
    id: ticketType,
    title: ticketType,
    tickets: [] as IGetTicket[],
  })
);

export const TicketBoard = () => {
  const { user } = useUser();

  const {
    decodedOutput,
    refetch,
    loading: ticketListLoading,
  } = useGetMembersTicket({
    memberId: user?.memberId as unknown as number,
  });
  const { mutate, loading: updateStatusLoading } = useUpdateTaskStatus();
  const [columns, _setColumns] = useState(allColumns);

  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);
  const [setConfidenceModalVisible, setSetConfidenceModalVisible] =
    useState(false);

  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<IGetTicket>();

  const columnsWithData = useMemo(() => {
    if (!decodedOutput) return columns;
    const _columns = columns.map((column) => ({
      ...column,
      tickets: [] as IGetTicket[],
    }));

    const ticketStatusesObj: TicketStatusesObjType = Object.keys(
      TaskStatusEnum
    ).reduce(
      (acc, curr, index) => ({
        ...acc,
        [curr]: { taskStatus: curr, columnIndex: index },
      }),
      {}
    );

    if (
      decodedOutput.value &&
      !decodedOutput.isError &&
      decodedOutput.value.Ok.length
    ) {
      decodedOutput.value.Ok.forEach((ticket) => {
        const columnIndex =
          ticketStatusesObj[ticket.ticketStatus as string].columnIndex;
        _columns[columnIndex].tickets.push(ticket);
      });
    }

    return _columns;
  }, [columns, decodedOutput]);

  const onDragEnd = async (
    { destination, draggableId, source }: DropResult,
    _provider: ResponderProvided
  ) => {
    if (!destination) {
      return; // Item was dropped outside of any droppable area
    }

    if (source.droppableId === destination.droppableId) return;

    updateTicketStatus(draggableId, destination.droppableId as TaskStatusEnum);
  };

  const updateTicketStatus = useCallback(
    async (ticketId: string, ticketStatus: TaskStatusEnum) => {
      const mutateValue = await mutate({
        ticketId,
        ticketStatus,
      });

      if (mutateValue) {
        if (mutateValue.isError)
          return toast.error(mutateValue.decodedOutput || 'An error occurred');

        toast.success('Ticket status updated!');
        refetch();
        setSelectedTicket(
          (prevState) => ({ ...prevState, ticketStatus } as IGetTicket)
        );
      }
    },
    [refetch, mutate]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Modal
        open={createTicketModalVisible}
        onClickBackdrop={() => setCreateTicketModalVisible(false)}
      >
        <CreateTicket
          toggleVisible={() =>
            setCreateTicketModalVisible(!createTicketModalVisible)
          }
          refetchTickets={() => refetch()}
        />
      </Modal>

      <Modal
        open={setConfidenceModalVisible}
        onClickBackdrop={() => setSetConfidenceModalVisible(false)}
      >
        <SetConfidence
          toggleVisible={() =>
            setSetConfidenceModalVisible(!createTicketModalVisible)
          }
        />
      </Modal>

      {selectedTicket && (
        <Modal
          open={ticketModalVisible}
          onClickBackdrop={() => setTicketModalVisible(false)}
          className='w-11/12 max-w-5xl'
        >
          <TicketModal
            closeModal={() => setTicketModalVisible(false)}
            ticket={selectedTicket}
            updateTicketStatus={updateTicketStatus}
            updateStatusLoading={updateStatusLoading}
          />
        </Modal>
      )}

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Tickets</h3>
        <div>
          <Button
            className='mr-2'
            onClick={() => setSetConfidenceModalVisible(true)}
            startIcon={<TfiCup />}
            variant='outline'
          >
            Set Confidence
          </Button>

          <Button
            onClick={() => setCreateTicketModalVisible(true)}
            startIcon={<AiOutlinePlus />}
          >
            Add New
          </Button>
        </div>
      </div>

      <div className='flex overflow-x-scroll'>
        {columnsWithData.map((column) => (
          <div
            key={column.id}
            className='flex min-w-[350px] flex-1 flex-col p-4'
          >
            <h2 className='bg-base-300 rounded-t p-2 text-lg font-semibold'>
              {TaskStatusEnum[column.title as keyof typeof TaskStatusEnum]}
            </h2>

            {updateStatusLoading || ticketListLoading ? (
              <div className='bg-base-200 flex min-h-[400px] items-center justify-center rounded rounded-t-none p-4 shadow-md'>
                <LoadingSpinner size='md' />
              </div>
            ) : (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='bg-base-200 min-h-[400px]  flex-1 rounded rounded-t-none p-4 shadow-md'
                  >
                    {column.tickets.map((ticket, index) => (
                      <Draggable
                        key={ticket.ticketId}
                        draggableId={ticket.ticketId}
                        index={index}
                      >
                        {(provided) => (
                          <Ticket
                            openTicketModal={() => {
                              setSelectedTicket(ticket);
                              setTicketModalVisible(true);
                            }}
                            provided={provided}
                            ticket={ticket}
                          />
                        )}
                      </Draggable>
                    ))}
                    {column.id === Object.keys(TaskStatusEnum)[0] && (
                      <Button
                        color='ghost'
                        className='mt-auto w-full'
                        startIcon={<AiOutlinePlus />}
                        onClick={() => setCreateTicketModalVisible(true)}
                      >
                        Create
                      </Button>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
