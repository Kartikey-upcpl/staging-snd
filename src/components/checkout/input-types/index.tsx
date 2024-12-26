import { Text } from './text';
import { Select } from './select';
import { type InputType, type InputProps, getType } from './types';
import validate from './validate';

export type { InputProps, InputType };
export { getType };

function Country(props : InputProps<string>) {
    const { field, value, onChanged, meta } = props;
    const options = Object.entries(meta.countries).map(([value, label]) => ({ value, label }));
    return <Select 
        field={field}
        initValue={value ?? ''}
        options={options}
        onChanged={onChanged}
        keyInput={field.name ?? 'country'}
        onValidate={(newValue) => {
            var messages: string[] = [];
            
            const validates: string[] = [
                ...(field.required ? ["required"] : []),
                ...(field?.validate ?? []),
            ];
            validates.forEach((validateName) => {
                const result = validate(validateName, newValue, props);
                if (result) {
                    messages = [...messages, result];
                }
            });

            return messages;
        }}
    />;
}

function State(props: InputProps<string>) {
    const { field, value, onChanged, meta } = props;
    const country_selected = meta.country_selected;

    if (!country_selected) {
        return <Text {...props} />;
    }

    const states = meta.countries_states[country_selected];
    if (!states || Object.keys(states).length < 1) {
        return <Text {...props} />;
    }

    const options = Object.entries(states).map(([value, label]) => ({ value, label }));
    return <Select 
        field={field}
        initValue={value ?? ''}
        options={options}
        onChanged={onChanged}
        keyInput={field.name ?? 'state'}
        onValidate={(newValue) => {
            var messages: string[] = [];
            
            const validates: string[] = [
                ...(field.required ? ["required"] : []),
                ...(field?.validate ?? []),
            ];
            validates.forEach((validateName) => {
                const result = validate(validateName, newValue, props);
                if (result) {
                    messages = [...messages, result];
                }
            });

            return messages;
        }}
    />;
}

const inputs: {
    text: InputType;
    textarea: InputType;
    password: InputType;
    email: InputType;
    tel: InputType;
    country: InputType;
    state: InputType;
    postcode: InputType;
} = {
    text: Text,
    textarea: Text,
    password: Text,
    email: Text,
    tel: Text,
    country: Country,
    state: State,
    postcode: Text,
}

export default inputs;