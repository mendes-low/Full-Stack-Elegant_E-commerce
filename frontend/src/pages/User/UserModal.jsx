import { useState, useContext } from 'react';
import { Button, Modal } from 'antd';

import UserContext from '../../context/user/user';

const UserModal = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { logout } = useContext(UserContext);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        logout();
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="link" style={{ color: '#6C7275', padding: '0px', fontSize: '16px', fontWeight: '550' }} onClick={showModal}>
                Logout
            </Button>
            <Modal
                centered
                title="Logout of your account"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: '#141718', borderColor: '#141718' } }}
                cancelButtonProps={{ style: { backgroundColor: '#6C7275', borderColor: '#6C7275', color: '#fff' } }}
            >
                <p>Are you sure you want to log out of your account?</p>
            </Modal>
        </>
    );
};

export default UserModal;