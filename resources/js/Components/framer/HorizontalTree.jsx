export default function HorizontalTree() {
    const items = [1, 2, 3];

    return (
        <div className="grid text-white">
            <div className="m-auto flex max-w-screen-xl flex-col items-center gap-6 p-6 lg:flex-row lg:gap-0">
                <div className="relative flex w-full flex-1 items-center lg:basis-[400px] lg:text-right">
                    <div className="flex-1 lg:pr-6">
                        <h2 className="text-4xl font-bold">Horizontal Tree List with Tailwind CSS</h2>
                    </div>
                    <div className="top-1/2 mt-px hidden h-px w-16 bg-green-500 lg:block"></div>
                </div>

                <ul className="lg:basis-[750px]">
                    {items.map((item) => (
                        <li key={item} className="group relative py-6">
                            <div className="absolute inset-0 hidden w-px bg-green-500 group-first:top-1/2 group-last:bottom-1/2 lg:block"></div>

                            <div className="items-center gap-6 lg:flex">
                                <div className="relative mb-4 lg:mb-0 lg:pl-16">
                                    <div className="absolute left-0 top-1/2 hidden h-px w-full bg-green-500 lg:block"></div>

                                    <div className="relative grid h-24 w-24 rounded-full border border-solid border-green-500 bg-neutral-900">
                                        <svg
                                            className="m-auto block h-full max-h-12 w-full"
                                            fill="none"
                                            height="15"
                                            width="15"
                                            viewBox="0 0 15 15"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M6.0068 13.4178L8.0068 1.4178L8.9932 1.5822L6.9932 13.5822L6.0068 13.4178ZM5.20711 4.5L2.20711 7.5L5.20711 10.5L4.5 11.2071L0.792892 7.5L4.5 3.79289L5.20711 4.5ZM10.5 3.79289L14.2071 7.5L10.5 11.2071L9.79289 10.5L12.7929 7.5L9.79289 4.5L10.5 3.79289Z"
                                                fill="white"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-xl font-bold">A heading in euismod dolor</h3>
                                    <p className="opacity-75">
                                        Lorem ipsum dolor sit amet consectetur. Consequat sollicitudin in euismod dolor,
                                        nec sodales viverra.
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

