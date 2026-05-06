type TaskProps = {
  
} & React.HTMLAttributes<HTMLDivElement>;

export const Task = ({ ...props }: TaskProps) => {
  return (
    <div {...props} className="rounded-lg bg-white py-5.75 px-4 drop-shadow-lg drop-shadow-shadow flex flex-col gap-2">
      <h3 className="heading-md">Lorem Ipsum Dolor</h3>
      <p className="body-md text-mediumgrey">0 of 3 subtasks</p>
    </div>
  );
};

Task.displayName = 'Task';