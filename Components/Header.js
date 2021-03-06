import { useState, useEffect } from 'react'
import Link from 'next/link';

import { getCategories } from "../Services/index";

const Header = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        });
    }, []);
    return (
        <div className="contaienr mx-auto px-10 mb-8">
            <div className="border-b w-full inline-blox border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-blold text-4xl text-white">
                            Graph CMS
                        </span>
                    </Link>
                </div>
                <div className="hiddern md:float-left md:contents">
                    {categories.map((category, index) => {
                        <Link key={index} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default Header
