import React, {useId} from 'react';

const Upload = () => {
    const id = useId()

    return (
        <label htmlFor={id}>
            <input type="file" id={id} />
        </label>
    );
};

export default Upload;