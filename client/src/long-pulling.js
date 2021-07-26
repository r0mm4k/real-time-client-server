import {useEffect, useState} from "react";
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const onChange = ({ target: { value } }) => setMessage(value);
    const onSubscribe = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/messages');
            setMessages((messages) => [data, ...messages]);
        } finally {
            await onSubscribe();
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/messages', { message });
            setMessage('');
        } catch (e) {
            alert('Error...');
        }
    };

    const hasMessages = !!messages.length && (
        <div>
            {messages.map(({ id, message }) => <div key={id} className="message">{message}</div>)}
        </div>
    );

    useEffect(() => {
        onSubscribe();
    }, [])

    return (
        <div className='center'>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' value={message} onChange={onChange} />
                <button type='submit'>Send</button>
            </form>

            {hasMessages}
        </div>
    )
}

export { LongPulling };
