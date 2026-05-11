import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Task as TaskType } from '@/lib/types';

type TaskProps = {
    data: TaskType;
} & React.HTMLAttributes<HTMLDivElement>;

export const Task = ({ data, ...props }: TaskProps) => {
    const { setOpenViewTask } = uiStore((state) => state);
    const { setActiveTask } = appStore((state) => state);
    return (
        <div
            {...props}
            className="rounded-lg bg-white py-5.75 px-4 drop-shadow-lg drop-shadow-shadow flex flex-col gap-2 hover:cursor-pointer hover:bg-mediumgrey/10 transition-colors duration-500 ease-in-out"
            onClick={() => {
                setOpenViewTask(true);
                setActiveTask(data);
            }}
        >
            <h3 className="heading-md">{data.title}</h3>
            <p className="body-md text-mediumgrey">
                {data.subtasks?.filter((st) => st.isCompleted).length} of{' '}
                {data.subtasks?.length} subtasks
            </p>
        </div>
    );
};

Task.displayName = 'Task';
