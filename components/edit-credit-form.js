'use client';

import { useActionState, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { editCredit } from "@/action/admin.actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const EditCreditForm = ({ users }) => {
    const [selectedUserId, setSelectedUserId] = useState("");
    const [credit, setCredit] = useState("");
    const selectedUser = users?.find(user => user._id === selectedUserId);
    const [state, formAction, isPending] = useActionState(editCredit, {});
    const [open, setOpen] = useState(false);

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
        const user = users.find(u => u._id === userId);
        setCredit(user?.credit || "");
    };

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="partner">Select Partner</Label>
                    <Select value={selectedUserId} onValueChange={handleUserSelect}>
                        <SelectTrigger id='partner' className={'w-2xl max-w-2xl'}>
                            <SelectValue placeholder="Select Partner" />
                        </SelectTrigger>
                        <SelectContent>
                            {users?.map(user => (
                                <SelectItem key={user?._id} value={user?._id}>{user?.companyName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedUser && (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="credit">Edit Credit</Label>
                            <Input
                                id="credit"
                                type="number"
                                defaultValue={credit}
                                onChange={(e) => setCredit(e.target.value)}
                                className={'max-w-2xl'}
                            />
                        </div>

                        <Button disabled={isPending} type="submit" className='max-w-2xl'>Update Credit</Button>
                    </>
                )}

                <input type="hidden" name="credit" value={credit} />
                <input type="hidden" name="partnerId" value={selectedUserId} />
            </form>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditCreditForm