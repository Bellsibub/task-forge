import { Input } from '@/components/ui/Input';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, Checkbox, Select } from './components/ui';

interface IFormInput {
    textinput: string;
    selectinput: string;
}
const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];
function App() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            textinput: '',
            selectinput: options[0].value,
        },
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    return (
        <div className="p-4 container mx-auto space-y-4">
            <h1 className="heading-xl text-primary">Colors</h1>
            <div>
                <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-primary rounded" />
                        <p className="body-md">Primary</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-primary-hover rounded" />
                        <p className="body-md">Primary Hover</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-destructive rounded" />
                        <p className="body-md">Destructive</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-destructive-hover rounded" />
                        <p className="body-md">Destructive Hover</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-darkgrey rounded" />
                        <p className="body-md">Dark Grey</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-mediumgrey rounded" />
                        <p className="body-md">Medium Grey</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-lines-dark rounded" />
                        <p className="body-md">Lines Dark</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-lines-light rounded" />
                        <p className="body-md">Lines Light</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-bg-dark rounded" />
                        <p className="body-md">Background Dark</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-bg-light rounded" />
                        <p className="body-md">Background Light</p>
                    </div>
                </div>
            </div>
            <h1 className="heading-xl text-primary">Typography</h1>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2 shrink-0">
                    <h1 className="heading-xl">Heading XL</h1>
                    <h2 className="heading-lg">Heading LG</h2>
                    <h3 className="heading-md">Heading MD</h3>
                    <h4 className="heading-sm">Heading SM</h4>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="body-lg">
                        Body (L) - Lorem ipsum dolor sit amet, consectetuer
                        adipiscing elit. Phasellus hendrerit. Pellentesque
                        aliquet nibh nec urna. In nisi neque, aliquet vel,
                        dapibus id, mattis vel, nisi. Sed pretium, ligula
                        sollicitudin laoreet viverra, tortor libero sodales leo,
                        eget blandit nunc tortor eu nibh. Nullam mollis. Ut
                        justo. Suspendisse potenti. Sed egestas, ante et
                        vulputate volutpat, eros pede semper est, vitae luctus
                        metus libero eu augue. Morbi purus libero, faucibus
                        adipiscing, commodo quis, gravida id, est.
                    </p>
                    <p className="body-md">
                        Body (M) - - Lorem ipsum dolor sit amet, consectetuer
                        adipiscing elit. Phasellus hendrerit. Pellentesque
                        aliquet nibh nec urna. In nisi neque, aliquet vel,
                        dapibus id, mattis vel, nisi. Sed pretium, ligula
                        sollicitudin laoreet viverra, tortor libero sodales leo,
                        eget blandit nunc tortor eu nibh. Nullam mollis. Ut
                        justo. Suspendisse potenti. Sed egestas, ante et
                        vulputate volutpat, eros pede semper est, vitae luctus
                        metus libero eu augue. Morbi purus libero, faucibus
                        adipiscing, commodo quis, gravida id, est.
                    </p>
                </div>
            </div>
            <h1 className="heading-xl text-primary">Interactives</h1>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Button size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">
                        Secondary
                    </Button>
                    <Button variant="destructive" size="sm">
                        Destructive
                    </Button>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="container mx-auto max-w-md">
                    <Checkbox id="checkbox1" label="Checkbox 1" />
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            label="Input"
                            name="textinput"
                            control={control}
                            placeholder="Type something..."
                            rules={{ required: "Can't be empty" }}
                        />
                        <Select
                            label="Select"
                            name="selectinput"
                            control={control}
                            options={options}                            
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
