type SidebarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ ...props }: SidebarProps) => {
    return (
        <aside {...props}>
            <div className="flex flex-col justify-between h-full py-8">
                <div className="bg-yellow-300 px-6">
                    <p>Sidebar</p>
                </div>
                <div className="bg-yellow-500 px-3">
                    <p>bottom</p>
                </div>
            </div>
        </aside>
    );
};

Sidebar.displayName = 'Sidebar';
