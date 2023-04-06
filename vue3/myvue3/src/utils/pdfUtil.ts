import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export function generatePDF({ element, filename, offsetX }: { element: any, filename: any, offsetX: any }) {
    window.pageYOffset = 0
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const w = element.offsetWidth
    const h = element.offsetHeight

    const options: any = {
        width: w,
        height: h,
        useCORS: true
    }

    if (typeof offsetX !== 'undefined') options.x = offsetX

    return new Promise((resolve, reject) => {
        html2canvas(element, {
            ...options
        }).then(canvas => {
            // 将canvas转为base64图片
            const pageData = canvas.toDataURL('image/jpeg', 1.0)

            const contentWidth: any = canvas.width
            const contentHeight: any = canvas.height
            // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75
            // 2为上面的scale 缩放了2倍
            const pdfX = (contentWidth + 20) / 2 * 0.75
            const pdfY = (contentHeight + 20) / 2 * 0.75

            // 设置内容图片的尺寸，img是pt单位
            const imgX = pdfX;
            const imgY = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离
            // 初始化jspdf 第一个参数方向：默认''时为纵向，第二个参数设置pdf内容图片使用的长度单位为pt，第三个参数为PDF的大小，单位是pt
            const orientation: any = contentWidth > contentHeight ? 'l' : ''
            const pdf = new jsPDF(orientation, 'pt', [pdfX, pdfY])
            pdf.addImage(pageData, 'jpeg', 0, 0, imgX, imgY)
            const datauri = pdf.output('datauristring')
            const file = dataURLtoFile(datauri, `${filename}.pdf`)

            resolve(file)
        }).catch((error) => {
            reject(error);
        })
    })
}

export function dataURLtoFile(dataurl: any, filename: any) {
    const arr = dataurl.split('base64,')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}
