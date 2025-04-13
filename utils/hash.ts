import { createHash } from 'crypto'

export const hashPasswordT = (unhashedpwd: string) => {
    return createHash('sha1').update(unhashedpwd).digest('hex');
}