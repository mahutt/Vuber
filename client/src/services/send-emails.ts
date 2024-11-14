import { EmailDetails } from '@/types/types'
import api from './api'


const sendEmail = async (emailDetails:EmailDetails): Promise<string> => {
    try {
        const response = await api.post<string>('/email/SendEmail', emailDetails )
        return response.data
    } catch (error) {
        console.error('Could not send email:', error)
        return "Error 420";
    }
}

export default sendEmail