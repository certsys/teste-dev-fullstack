import React from 'react';
import { TaskNotFoundDiv } from './PropertyNotFoundDiv';

const TaskNotFound = (): JSX.Element => {
  return (
    <TaskNotFoundDiv className="task-not-found">
      <h3>Nenhuma tarefa encontrada.</h3>
    </TaskNotFoundDiv>
  );
};

export default TaskNotFound;
