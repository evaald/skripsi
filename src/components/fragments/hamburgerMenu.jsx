import { useState } from "react";
import HamburgerMenu from "../elements/hambugerMenu";
import Sidebar from "../layouts/sidebar/sidebar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

function FragmenHamburgerMenu (){
    const [showDiv, setShowDiv] = useState(false);

    return(
        <div className="flex">
            {!showDiv && (<div
                className="mt-2 p-2 rounded-xl w-min lg:hidden hover:bg-gray-300 mx-4 z-40 bg-white" onClick={() => setShowDiv(true)}>
                    <HamburgerMenu />
                </div>
            )}
             <AnimatePresence>
            {showDiv && (
                <motion.div 
                className="fixed w-4/6 border-black z-50 lg:hidden" 
                onClick={() => setShowDiv(false)}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}>
                    <Sidebar />
                </motion.div>
            )}
            </AnimatePresence>
    
            <div className="hidden lg:block">
                 <Sidebar />
            </div>
            <div className="ml-18 p-4 lg:hidden">
            <h1 className="text-xl text-white">I</h1>
            </div>
        </div>
    )
}

export default FragmenHamburgerMenu;