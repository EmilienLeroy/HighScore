
/**
 * Share data using the `Web Share API`.
 * 
 * @param {{
 *  text: string,
 *  title: string,
 *  url: string,
 * }} data - share info
 * @returns 
 */
const share = ({ text, title, url }) => {
  if (!navigator.share) {
    return;
  }

  navigator.share({
    title,
    text,
    url: `${window.location.origin}${url}`
  })
}

/**
 * Main entrypoint.
 * This function is called when the document is loaded.
 */
const main = () => {
  const shares = document.querySelectorAll('.share');

  shares.forEach((el) => {
    if (!navigator.share) {
      return el.style.display = 'none';
    }

    el.addEventListener('click', () => share(el.dataset));
  });
}

main();