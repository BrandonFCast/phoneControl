import { mouse, left, right, up, down, keyboard, Key, sleep } from '@nut-tree-fork/nut-js'
/*
movement => WASD
select => Z
start => F
A => X
B => C
L => Q
R => E
x2speed => T
*/
keyboard.config.autoDelayMs = 50;
const moverMouse = async (dir) => {
    const distance = 50;
    if (dir === 'u') {
        await mouse.move(up(distance))
    } else if (dir === 'r') {
        await mouse.move(right(distance))
    } else if (dir === 'd') {
        await mouse.move(down(distance))
    } else if (dir === 'l') {
        await mouse.move(left(distance))
    }
}

export const pressKey = async (k) => {
    await keyboard.pressKey(k)
}

export const releaseKey = async (k) => {
    await keyboard.releaseKey(k)
}
export const type = async (k) => {
    await keyboard.pressKey(k)
    // await sleep(1);
    await keyboard.releaseKey(k)
}
