import axios from "axios";
import { useState } from "react";
import { fetchAndSet } from "../utils/fetchTasks";
import { ITask } from "../interfaces/ITask";
import { IAddTask } from "../interfaces/IAddTask";
import { validateTask } from "../utils/validateTask";
import { Tr, Td, IconButton, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { IUser } from "../interfaces/IUser";

const cleanTask = {
  value: "",
  due_date: "",
};

interface AddTaskProps {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  currUser: IUser | undefined;
  toast: any;
}

function AddTask({ setTasks, currUser, toast }: AddTaskProps): JSX.Element {
  const [taskInp, setTaskInp] = useState<IAddTask>(cleanTask);

  const handleAddOnClick = () => {
    if (!validateTask(taskInp, toast)) {
      return;
    }
    currUser &&
      axios
        .post("https://anagmrebelo-to-do-app.onrender.com/tasks", {
          ...taskInp,
          status: false,
          user_id: currUser.id,
        })
        .then(() =>
          fetchAndSet(
            `https://anagmrebelo-to-do-app.onrender.com/tasks/${currUser.id}`,
            setTasks
          )
        );
    setTaskInp(cleanTask);
  };
  return (
    <Tr className="highlight-row">
      <Td>
        <IconButton
          aria-label="Add task"
          icon={<AddIcon />}
          onClick={handleAddOnClick}
        />
      </Td>
      <Td>
        <Input
          type="text"
          placeholder="Type a task here..."
          value={taskInp.value}
          onChange={(e) => setTaskInp({ ...taskInp, value: e.target.value })}
        />
      </Td>
      <Td>
        <Input
          type="Date"
          value={taskInp.due_date}
          onChange={(e) => setTaskInp({ ...taskInp, due_date: e.target.value })}
        />
      </Td>
      <Td></Td>
    </Tr>
  );
}

export { AddTask };
