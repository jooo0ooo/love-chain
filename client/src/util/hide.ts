export const hideEmailInfo = (email: string): string => {
    const len = email.split('@')[0].length - 3;
    if (len < 0) {
        return email.replace(new RegExp('.(?=.{0,' + 0 + '}@)', 'g'), '*');
    }

    return email.replace(new RegExp('.(?=.{0,' + len + '}@)', 'g'), '*');
};
