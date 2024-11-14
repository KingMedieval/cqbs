import classes from "@/components/Students/Students.module.css";
import { useForm } from '@mantine/form';
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useState } from "react";

export default function Students() {

    const [err, setErr] = useState(0);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid' +
                ' email'),
        },
    });

    const handleSubmit = async (values : Object) => {
        console.log(values)
        try {
            await fetch('/api/submit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then((response) => {
                setErr(response.status);
                console.log(`${response.status} ${response.body}`);
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1 className={classes.head}>Prospective Students</h1>
            <p className={classes.sub}>Fill out the interest form!</p>
            <div className={classes.formDiv}>
                <form
                    onSubmit={form.onSubmit((values) => {
                        handleSubmit(values);
                    })}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@ucsd.edu"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />

                    <Checkbox
                        mt="md"
                        label="I agree to sell my privacy"
                        key={form.key('termsOfService')}
                        {...form.getInputProps('termsOfService', {type: 'checkbox'})}
                    />

                    <Group justify="flex-end" mt="md">
                        {
                            err === 200 ?
                                <Button type="submit" color="red">Error</Button> :
                                <Button type="submit">Submit</Button>
                        }
                    </Group>
                </form>
            </div>
        </div>
    );
}