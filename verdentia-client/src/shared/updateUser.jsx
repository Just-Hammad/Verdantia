import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import handleUserLogUpdate from './updateUserLog';

const handleUserUpdate = (method, formData, callBack, USER, close) => e => {
    e.preventDefault();

    if (formData.act == null) {
        {
            switch (method) {
                case 'POST':
                    formData.act = 'Created';
                    break;
                case 'PUT':
                    formData.act = 'Updated';
                    break;
                case 'DELETE':
                    formData.act = 'Deleted';
                    break;
                default:
                    formData.act = 'Changed';
                    break;
            }
        }
    }

    fetch(`http://localhost:5163/Users`, {
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
            handleUserLogUpdate(formData, USER);
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

export default handleUserUpdate;
