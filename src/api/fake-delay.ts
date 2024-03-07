export async function fakeDelay(delay: number) {
  await new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })
}
