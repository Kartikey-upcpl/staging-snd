'use client';

import { createContext, useMemo, useContext, ReactNode, useCallback, useReducer, useEffect } from "react";
import Link from "next/link";
import { classnames } from "@/utlis/classnames";

type NotificationItemAction = {
    text: string,
    href?: string,
    onClick?: () => void,
};
type NotificationItem = {
    id: number,
    message: string,
    type: "success" | "error" | "warning" | "info",
    action?: NotificationItemAction
}

type NotificationAction =
    | { type: 'ADD_NOTIFICATION'; payload: { message: string, type: "success" | "error" | "warning" | "info", action: NotificationItemAction | undefined } }
    | { type: 'REMOVE_NOTIFICATION'; payload: number };

type NotificationContextType = {
    addSuccessNotification: (message: any, action?: NotificationItemAction) => void;
    addErrorNotification: (message: any, action?: NotificationItemAction) => void;
    addWarningNotification: (message: any, action?: NotificationItemAction) => void;
    addInfoNotification: (message: any, action?: NotificationItemAction) => void;
    addCustomNotification: (type: "success" | "error" | "warning" | "info", message: any, action?: NotificationItemAction) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function notificationReducer(state: NotificationItem[], action: NotificationAction): NotificationItem[] {

    switch (action.type) {
        case 'ADD_NOTIFICATION': {

            return [
                ...state, {
                    id: new Date().getTime(),
                    message: action.payload.message,
                    action: action.payload.action,
                    type: action.payload.type,
                }
            ];
        }
        case 'REMOVE_NOTIFICATION': {
            return state.filter((n) => n.id !== action.payload);
        }
        default:
            return state;
    }
}

const ItemNotification = ({ notification, onClose }: { notification: NotificationItem, onClose: () => void }) => {
    useEffect(() => {
        setTimeout(() => {
            onClose();
        }, 3000);
    }, [onClose]);

    let icon;
    let classContainerIcon;

    switch (notification.type) {
        case "success":
            icon = (
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
            );
            classContainerIcon = "text-green-500 bg-green-100";
            break;
        case "error":
            icon = (
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
            );
            classContainerIcon = "text-red-500 bg-red-100";
            break;
        case "warning":
            icon = (
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
            );
            classContainerIcon = "text-orange-500 bg-orange-100";
            break;
        default:
            icon = (
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                </svg>
            );
            classContainerIcon = "text-black bg-gray-100";
    }
    return (
        <div className="flex !mb-4 gap-3 items-center w-full min-w-xs max-w-md px-4 py-3 text-gray-500 bg-white rounded-lg shadow-md dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className={classnames(
                "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg",
                {
                    [classContainerIcon]: true,
                },
            )}>
                {icon}
                <span className="sr-only">Check icon</span>
            </div>
            <div className="flex-1 text-sm font-normal" dangerouslySetInnerHTML={{ __html: notification.message }} />
            {!!notification.action && (
                <Link
                    className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
                    href={notification.action.href ?? ""}
                    onClick={notification.action.onClick}
                    dangerouslySetInnerHTML={{__html: notification.action.text}}
                />
            )}
        </div>
    );
}

function convertText(content: any): string {
    if (typeof content === "string") {
        return content;
    }

    if (!!content?.message) {
        return content.message;
    }

    return "";
}

export function Notifications({ children }: { children?: ReactNode }) {
    const [notifications, dispatch] = useReducer(notificationReducer, [])

    const addNotification = useCallback((type: "success" | "error" | "warning" | "info", content: any, action?: NotificationItemAction) => {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                message: convertText(content),
                action: action,
                type: type,
            },
        });
    }, [dispatch]);

    const removeNotification = useCallback((id: number) => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, [dispatch]);

    const value: NotificationContextType = useMemo(
        () => ({
            addSuccessNotification: (message, action) => addNotification("success", message, action),
            addErrorNotification: (message, action) => addNotification("error", message, action),
            addWarningNotification: (message, action) => addNotification("warning", message, action),
            addInfoNotification: (message, action) => addNotification("info", message, action),
            addCustomNotification: (type, message, action) => addNotification(type, message, action),
        }),
        [addNotification]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
            {notifications.length > 0 && (
                <div className="fixed z-[20000] bottom-2 right-5 max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                        <ItemNotification
                            key={notification.id}
                            notification={notification}
                            onClose={() => removeNotification(notification.id)}
                        />
                    ))}
                </div>
            )}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a Notifications');
    }
    return context;
}