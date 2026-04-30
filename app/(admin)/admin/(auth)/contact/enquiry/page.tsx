"use client"

import React, { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { toast } from 'sonner'
import { LuMessageSquareShare } from "react-icons/lu";
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";

type Enquiry = {
    _id: string;
    first: string;
    last: string;
    email: string;
    phone: string;
    message: string;
}

const AdminEnquiry = () => {

    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [enquiries, setEnquiries] = useState<Enquiry[] | []>([])
    const [refetch, setRefetch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };


    const changePage = (newPage: number) => {
        setPage(newPage);
        router.push(`${pathname}?page=${newPage}`);
    };

    useEffect(() => {

        const fetchEnquiriesData = async () => {
            try {
                const response = await fetch(`/api/admin/contact/enquiry?page=${page}&limit=10`);

                if (response.ok) {
                    const data = await response.json();

                    setEnquiries(data.data);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error("Error fetching enquiries:", error);
            }
        };

        fetchEnquiriesData()
    }, [page, refetch])


    const toggleSelectAll = () => {
        if (selectedIds.length === enquiries.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(enquiries.map((item) => item._id));
        }
    };


    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) {
            toast.error("No enquiries selected");
            return;
        }

        try {
            const response = await fetch(`/api/admin/contact/enquiry/bulk-delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setSelectedIds([]);
                setRefetch((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>Enquiries</h1>
            </div>
            <div className='flex flex-col gap-3 min-h-[calc(100vh-200px)]'>
                <div className="flex items-center gap-10 justify-end px-5">

                    {/* <button
                        onClick={toggleSelectAll}
                        className="px-3 py-1 border rounded"
                    >
                        {selectedIds.length === enquiries.length
                            ? "Unselect All"
                            : "Select All"}
                    </button> */}
                    {selectedIds.length > 0 && <div className="relative">
                        <MdDelete className="text-red-600 cursor-pointer text-2xl" onClick={handleBulkDelete} />
                        {selectedIds.length > 0 && <span className="absolute -top-1 left-4 w-full h-full bg-red-600 text-white flex items-center justify-center text-[10px] rounded-full h-[15px] w-[15px]">{selectedIds.length}</span>}
                    </div>}

                    {enquiries && enquiries.length > 0 && <input
                        type="checkbox"
                        checked={selectedIds.length === enquiries.length}
                        onChange={toggleSelectAll}
                    />}
                    {/* <button
                        onClick={handleBulkDelete}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                        Delete Selected ({selectedIds.length})
                    </button> */}


                </div>
                {enquiries && enquiries.length > 0 ? (enquiries.map((item, i) => (
                    <div className='w-full relative' key={i}>

                        <div className='flex h-8 items-center px-5 justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                            <div className="">
                                <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.first}</h5>
                            </div>
                            <div className='flex items-center gap-10'>
                                <button onClick={() => setSelectedEnquiry(item)}><LuMessageSquareShare className='text-white'/></button>

                                {selectedEnquiry &&
                                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                                <div className="p-5 flex flex-col gap-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                    <div className="flex flex-col gap-2">

                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 text-sm">

                                                        <div className="flex flex-col">
                                                            <label className="font-semibold text-gray-600">First Name</label>
                                                            <span className="text-gray-900">{selectedEnquiry.first}</span>
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label className="font-semibold text-gray-600">Last Name</label>
                                                            <span className="text-gray-900">{selectedEnquiry.last}</span>
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <label className="font-semibold text-gray-600">Email</label>
                                                            <span className="text-gray-900">{selectedEnquiry.email}</span>
                                                        </div>


                                                        <div className="flex flex-col">
                                                            <label className="font-semibold text-gray-600">Phone</label>
                                                            <span className="text-gray-900">{selectedEnquiry.phone}</span>
                                                        </div>


                                                        <div className="flex flex-col">
                                                            <label className="font-semibold text-gray-600">Message</label>
                                                            <p className="text-gray-900 whitespace-pre-line">
                                                                {selectedEnquiry.message}
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        {/* <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Save</button> */}
                                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setSelectedEnquiry(null)}>Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(item._id)}
                                    onChange={() => toggleSelect(item._id)}
                                />
                            </div>
                        </div>

                    </div>
                )))
                    :

                    (<div>No enquiries available</div>)}
            </div>

            {enquiries && enquiries.length > 0 && <div className='mb-10'>
                <SmartPagination
                    page={page}
                    totalPages={totalPages}
                    setPage={changePage}
                />

            </div>}

        </div>
    )
}

export default AdminEnquiry