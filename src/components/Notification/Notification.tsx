import classes from './Notification.module.css';
import {NotificationData, NotificationStatus} from "../../store/ui-slice";

export const Notification = (props: NotificationData) => {
    let specialClasses = '';

    if (props.status === NotificationStatus.error) {
        specialClasses = classes.error;
    }
    if (props.status === NotificationStatus.success) {
        specialClasses = classes.success;
    }

    if(props.status === NotificationStatus.info) {
        specialClasses = classes.info
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};
