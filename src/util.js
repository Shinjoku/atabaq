// Workaround to get the taskbar's height. Not ideal but I couldn't come up with a better
// way to prevent windows from going over the taskbar
export function getTaskbarHeight(){
  let taskbarHeight = window.getComputedStyle(document.getElementById("taskbar")).height;
  taskbarHeight = parseFloat(taskbarHeight.substring(0, taskbarHeight.length - 2));
  return taskbarHeight;
}