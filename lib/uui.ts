const UUID_LENGTH = 15
const UUID_CHARS_LIST = 'h138mdA9DENm19N8ahck0ijAUEKahdUNeued8aSnr2jdKa14Un39Dn2908Am31';

export const uuid = {
    userid: () => {
        let final_uuid = ''
        for (let i = 0; i < UUID_LENGTH; i++) {
            final_uuid += UUID_CHARS_LIST[Math.floor(Math.random() * UUID_CHARS_LIST.length)];
        }
        return 'fc_user_' + final_uuid;
    },
    clinicid: () => {
        let final_uuid = ''
        for (let i = 0; i < UUID_LENGTH; i++) {
            final_uuid += UUID_CHARS_LIST[Math.floor(Math.random() * UUID_CHARS_LIST.length)];
        }
        return 'fc_clinic_' + final_uuid;
    },
    bookingid: () => {
        let final_uuid = ''
        for (let i = 0; i < UUID_LENGTH; i++) {
            final_uuid += UUID_CHARS_LIST[Math.floor(Math.random() * UUID_CHARS_LIST.length)];
        }
        return 'fc_booking_' + final_uuid;
    },
    replyid: () => {
        let final_uuid = ''
        for (let i = 0; i < UUID_LENGTH; i++) {
            final_uuid += UUID_CHARS_LIST[Math.floor(Math.random() * UUID_CHARS_LIST.length)];
        }
        return 'fc_reply_' + final_uuid;
    },
    postid: () => {
        let final_uuid = ''
        for (let i = 0; i < UUID_LENGTH; i++) {
            final_uuid += UUID_CHARS_LIST[Math.floor(Math.random() * UUID_CHARS_LIST.length)];
        }
        return 'fc_post_' + final_uuid;
    },
}