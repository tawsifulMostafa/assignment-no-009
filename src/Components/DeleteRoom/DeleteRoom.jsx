"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeleteModal = ({ room }) => {

    
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        const delRes = await fetch(`http://localhost:8000/rooms/${room._id}`, {
            method: 'DELETE',
            body: JSON.stringify()
        })
        const data = await delRes.json()
        if (!delRes.ok) {
            toast.error("Delete Failed")
            return
        } else {
            toast.success("deleted Successfully", {
                style: {
                    color: "green"
                }
            })

        }

        router.refresh()
        setIsOpen(false)
    }
    return (
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button variant="danger" className={"rounded-none bg-white text-red-600 border border-red-300"}>Delete Room</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Room permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{room?.name}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete Room
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
export default DeleteModal;