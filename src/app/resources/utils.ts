// Fisher-Yates Shuffle Algorithm
export class Utils {

    private constructor() {
    }

    static shuffleArray(arr: any[]) {
        let n = arr.length, temp, j
        for (let i = n; i > 0; i--) {
            j = Math.floor(Math.random()*i)
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }

}

