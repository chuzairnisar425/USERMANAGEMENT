import { useEffect, useState } from 'react';
import deleteGif from './../../../../_theme/assets/gifs/trash-bin.gif';

type DeleteBodyProps = {
    message?: string;
    close: () => void;
    delete: () => void;
    isDeleting: boolean;
};

function Delete({ message, close, delete: deleteFun, isDeleting }: DeleteBodyProps) {
    const [initiated, setInitiated] = useState(false);
    useEffect(() => {
        if (!initiated) {
            setInitiated(isDeleting);
        }
    }, [isDeleting]);
    return (
        <div className="flex justify-center flex-col items-center space-y-4 mt-5">
            <img src={deleteGif} alt="delete" className="w-12 h-12" />
            <p>{message ?? 'Are you sure you want to delete?'}</p>
            <div className="flex gap-4">
                <button className="btn btn-outline-dark hover:bg-brand-500 hover:text-white hover:border-brand-500" onClick={close}>
                    Cancel
                </button>
                <button disabled={initiated} className="btn btn-danger" onClick={deleteFun}>
                    {initiated ? (
                        <>
                            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
                            Loading
                        </>
                    ) : (
                        'Delete'
                    )}
                </button>
            </div>
        </div>
    );
}

export default Delete;
