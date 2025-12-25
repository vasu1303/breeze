import logo from '../../assets/logo.png'
export default function Logo() {
    return(
        <div className="bg-slate-400 h-12">
            <img src={logo} className='size-full' alt="" />
        </div>
    )
}