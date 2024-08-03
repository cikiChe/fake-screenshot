"use client"

import React, {useCallback, useEffect, useRef, useState} from "react";
import {renderCanvas} from "@/app/utils/renderCanvas";
//引入data目录下的json文件
import data from "@/app/data/quotes.json";
let language :  "zh"  | 'en' = 'zh';
let h1_title_descption = data[language].h1_title_descption;
let h2_descption = data[language].h2_descption;
let people_descption = data[language].people_descption;
let uplod_local_people_descption = data[language].uplod_local_people_descption;
let people_speak_descption = data[language].people_speak_descption;
let save_img_descption = data[language].save_img_descption;
let change_language_descption = data[language].change_language_descption;
let font_size_descption = data[language].font_size_descption;
let preview_descption = data[language].preview_descption;
        

export default function Home() {
    const quotes = [data[language].input_content];
    const [content, setContent] = useState(quotes[0])
    const [image, setImage] = useState("/assets/赵四.jpg")
    const [fontSize, setFontSize] = useState(24)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleHeroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setImage(e.target.value)
    }
    const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSize(Number(e.target.value))
    }

    const handleRenderCanvas = useCallback(() => {
        renderCanvas(canvasRef.current, content, image, "Arial", fontSize, false);
    }, [image, content, fontSize])

    useEffect(() => {
        handleRenderCanvas();
    }, [image, content, fontSize, handleRenderCanvas]);

    const handleUpload = (e: any) => {
        const file = e.target.files[0]
        if (!file) {
            console.error("no file selected")
            return
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            const dataURL = e.target?.result;
            console.log(dataURL)
            setImage(dataURL as string);
        }
    }
    const handleSaveImage = (e: any) => {
        e.preventDefault()
        const canvas = canvasRef.current;
        if (!canvas) {
            return
        }
        const link = document.createElement("a")
        link.download = "screenshot.png"
        link.href = canvas.toDataURL()
        link.click()
    }
    const togglelanguage = (e: any) => {
        e.preventDefault()
        console.log('click');
        if (language == 'en') {
            language = 'zh'
        }else{
            language = 'en'
        }
        setContent(data[language].input_content)
        h1_title_descption = data[language].h1_title_descption;
        h2_descption = data[language].h2_descption;
        people_descption = data[language].people_descption;
        uplod_local_people_descption = data[language].uplod_local_people_descption;
        people_speak_descption = data[language].people_speak_descption;
        save_img_descption = data[language].save_img_descption;
        change_language_descption = data[language].change_language_descption;
        font_size_descption = data[language].font_size_descption;
        preview_descption = data[language].preview_descption;
    }
    
    return (
        <div className="mx-auto max-w-5xl min-w-fit">
            {/*头部*/}
            <header className="bg-blue-500 p-10 text-center text-white">
                <h1 className="text-4xl mb-10 font-bold">{h1_title_descption}</h1>
                <h2 className="text-xl">“{h2_descption}”</h2>
            </header>
            {/*内容区*/}
            <main className="flex bg-white">
                {/*表单区*/}
                <form className="w-1/2 rounded p-6">
                    <label className="text-lg font-bold block mb-2" htmlFor="hero">{people_descption}</label>
                    <select
                        name="hero"
                        id="hero"
                        className="w-full border-2 border-solid border-gray-200 rounded p-2 mb-2"
                        onChange={handleHeroChange}
                    >
                        <option value="/assets/赵四.jpg">赵四-zhao si</option>
                        <option value="/assets/刘能.jpg">刘能-liu neng</option>
                        <option value="/assets/马斯克.jpg">马斯克-Elon Reeve Musk</option>
                        <option value="/assets/马云.jpg">马云-jack ma</option>
                        <option value="/assets/乔布斯.jpg">乔布斯-Steven Paul Jobs</option>
                        <option value="/assets/于丹.jpg">于丹-yu dan</option>
                    </select>
                    <label className="text-lg font-bold block mb-2 bg-blue-500 p-2 rounded text-white"
                           htmlFor="upload">{uplod_local_people_descption}</label>
                    <input className="" type="file" id="upload" hidden onChange={handleUpload} name="upload"/>
                    <label className="text-lg font-bold block mb-2" htmlFor="content">{people_speak_descption}</label>
                    <textarea
                        name="content"
                        className="w-full border-2 border-solid border-gray-200 rounded p-2 mb-2"
                        placeholder={quotes[0]}
                        value={content}
                        onChange={(e) => setContent(e.target.value)} rows={8} id="content"
                    />
                    <label className="text-lg font-bold block mb-2 " htmlFor="font-size">{font_size_descption}</label>
                    <div className="flex items-center mb-4">
                        <input type="range" id="font-size" name="font-size" min="12" max="48" step="1"
                               value={fontSize}
                               className="w-full"
                               onChange={handleFontSize}
                        />
                        <span className="ml-4">{fontSize}px</span>
                    </div>
                    <button className="w-30 h-10 bg-blue-500 text-white rounded px-4 py-2"
                            onClick={handleSaveImage}>{save_img_descption}
                    </button>
                    <button className="w-30 h-10 bg-blue-500 text-white rounded px-6 py-2 mx-5"
                            onClick={togglelanguage}>{change_language_descption}
                    </button>
                </form>
                {/*图片区*/}
                <div className="w-1/2 rounded">
                    <div className="w-full h-auto border rounded py-2">{preview_descption}：</div>
                    <canvas ref={canvasRef} className="w-full h-auto border rounded"></canvas>
                </div>
            </main>
        </div>
    );
}
