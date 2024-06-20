import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleTaskUpdate = (method, formData, callBack, close) => e => {
    e.preventDefault();

    fetch(`http://localhost:5163/Tasks`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.text());
        }
        return response.text();
    })
    .then(data => {
        toast.success(data);
        if (callBack) {
            callBack();
        }
        if (close) {
            close();
        }
    })
    .catch(error => {
        console.log(formData);
        console.error('Error updating data:', error);
        toast.error('Error updating Data. Please try again.');
    });
};

export default handleTaskUpdate;
