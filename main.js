// ==============================================
// Prevent Email button event Bubbling using
// Below tricks
//===============================================
let ModalOpen = false;
$("#send-email-modal").on("hidden.bs.modal", function () {
  ModalOpen = false;
});
$("#send-email-modal").on("show.bs.modal", function () {
  ModalOpen = true;
});

//===================================================
// Form initialization fucntion with various tweaks
// settings, default value and others
//===================================================
function initForms() {
  // Accounting Number formating settings
  accounting.settings = {
    currency: {
      symbol: " $", // default currency symbol is '$'
      format: "%v%s", // controls output: %s = symbol, %v = value/number (can be object: see below)
      decimal: ".", // decimal point separator
      thousand: ",", // thousands separator
      precision: 2, // decimal places
    },
    number: {
      precision: 0, // default precision on numbers is 0
      thousand: ",",
      decimal: ".",
    },
  };

  // Enabling tooltip
  $("[data-toggle=tooltip]").tooltip();
  // Getting some icons to add into the input element
  var dollarSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    `;
  var textSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
    `;

  var calendarSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    `;
  var downArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
    `;
  var percentSign = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-percent"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
    `;
  var dayIcon = `days`;

  let logoImageUri = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAgAElEQVR4Xu3de5wddX3/8TfLZvOIG7cxElIgxQimlEuRizFFKCViQBBRpBFE5CKiGG/gBa/11qpVAUWFggqCRVQoVhERRCQigogEpAlIA4gUiCEQMb9AzEmy+/vDz9FxmJnPzJw558x8z+v5eOSR3bOfSXb3nDPv+V5ns4mJCQEAgGYb8goAAED9EegAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABGPYK6m5kZMQrAQbJHEmHSjpQ0i6SpktaKWmJpKskfU/Sg94/AgyCVqvllTTKZhMTE15NrRHoGHCTJP2jpIMtyOd4B0i63cL9ckk3Sxr3DgBCRKDXDIGOATRT0kskvdha4mPeARkes1b7lZKulvS4dwAQCgK9Zgh0DIBhSXOtFX6QpN27NP9lk6SfWLhfKWmZdwDQZAR6zRDoCNQWkRb4QZKe6R3QBb+OtN5/JGm9dwDQJAR6zRDoCESvWuFlPSnphxbuTKxDEAj0miHQ0WBbWXgvkHSAzUhviujEulskbfQOAOqGQK8ZAh0NMknS3hbiB0jazTugIR6T9H37c5Wk1d4BQB0Q6DVDoKPmtouMhb9Q0lTvgIbbJOmmSNf8Hd4BQL8Q6DVDoKNmpkraLzKZbXvvgMA9YC33KyRdJ+kJ7wCgVwj0miHQUQN72Dj4gZL2sa51PNV6C/V2wN/nHQB0E4FeMwQ6+mCmBXg7xGd6ByDR3Rbs35d0vaQN3gFAlQj0miHQ0QPt7VUPtBB/bs2WlIVgraRrbNz9KkkPeQcAnSLQa4ZAR5fsYAF+oI2JP807AJW6zbaiZVkcuoZArxkCHRWZLml+ZF34tt4B6JnVkn4Qab0/6h0A5EGg1wyBjpImSZoX6UZ/nqTNvYPQd+PWYm/fCvZW7haHsgj0miHQUcBzbEOXdjd6J3cpQz2stK75q+xvNrVBbgR6zRDoyDDNNnM5wP482zsAjbZJ0s9tU5urJC2h9Y4sBHrNEOiImCTp+RbeC+xjutEHF613ZCLQa4ZAH3hzIuPgdKMjDa13PAWBXjME+sBpz0Zvh/hs7wAgQbT1fg0z5wcTgV4zBHrwJknaKxLge9CNjopFZ85/32bOs+59ABDoNUOgB2lHC/D9rRs99DuUoV7a696vtj8rvAPQTAR6zRDoQZhhre8DLMRneQcAPXSbdct/X9JP2XM+HAR6zRDojTRZ0r4W4i9ib3Q0yFpJP4qMv3PHuAYj0GuGQG+EIUm7Ru5Qto+kKd5BQAPcay33qyUttsBHQxDoNUOg19Ysa323Q3yGdwDQcBsk3WDd81dLup2lcfVGoNcMgV4bY5Fu9AU2sQ0YZKsi4X4Nk+vqh0CvGQK9b4YlzbVJbAfajU4meQcBA+wOC/ZrJF0vaZ13ALqLQK8ZAr2n5lg3+gG2nGyadwCAROst1NsBf7t3AKpHoNcMgd5VW1gLfIH9za5sQHesioT7NZIe8g5A5wj0miHQKzXZZqC314PvznIyoC/uss1tfmgt+TXeASiOQK8ZAr0jLCcD6m+DbU3bbr3/nM1tqkGg1wyBXti2Ng6+P8vJgEZaY632a60Fv9Q7AMkI9Joh0F1jkl4YCfAdvAOQy2JJX7B1xysjF0ZrJM20m8gslHQEN5NBl62QdJ213hdLut87AH9EoNcMgf4Uk2wJWXtb1XkESqU2SHqjpPO8QrOLpG9K2skrBCqy3LanvdaCnlvDpiDQa4ZAlyTtHJmJvq+1ylG9TZL+WdK3vcKY6XZi3dUrBCo2buvfr7OA/wkT7P6MQK+ZAQ30rSy821urbu0dgEqcKunTXlGK59hdu7gVLPppk02qu86652+U9IR3UKgI9JoZkEAftY1c9rc/tPR672eS9u5wb+73SfqYVwT00HpJN0n6sQX8TfbYQCDQaybQQB+WtGdkOdlebKvad/8g6WavyDFmG4bQSkddrbeJnj+ykA96iRyBXjMBBfqcSICzrWq9XCXpIK8opwslHeMVATXxpKSfWus9uIAn0GumwYE+I7YefFvvAPTNkTZTvQpHSfqaVwTUVDTgb7Beq8Z20RPoNdOgQJ9iM9DbAb4r26o2xtYV3vpyK0kPDshzf4WkCySdwQVrsOJj8Dc36S5yBHrN1DjQh2wcvN0K38f2SkfzbOYVFPR2SYeU+Hc3SVrtFTnWl1y2VOS4cUlLJF1pH4/ZJjt/Y1/fmPBzrE0IgmFJz7CPn24Xxc+0TXvm2ryS9ZI+Lumt9jX0V3ub2nYL/qcFXjc9R6DXTM0CfbvIOPh8W3+M5isavOi+Mdt/4T7bqe+7dpGEetlkt4a9wbar/YndWa4WCPSa6XOgT490ob9I0rO9A9BIBHr9/Zekw70i1MJdFvA3Wsjf5x3QLQR6zfQ40EftlqIH2qxnbi86GAj0ehuS9D9sr9tYD1vX/A02VPOrXm1XS6DXTIFA38ZeMKNeYcwklpANPAK9vqZL+rKkw7xCNMo6m1fRqcdtD4nEuSehBfqwVxCQOZJme0UAGmOOTb5i6+PwTLE/nZphc5s6nUzaCIMU6EAZj3sFJcyU9K6EE1ZWq2S8g27IiQ6OLWOlpFtje4RvZX9XsfxvTNJLJZ1uv0sgy8DszEigA9mmWfBWubb2DZLe4RU13FpJn7O16EdLOske/44tM/uFc3zbsE08fRU3IgKyMaEL8O3lFRRU9b9XR1PtZjQ3Slpk55ohG+u+xSY/eXNTTrQJU1dJOpYwB7IR6IDvaK+ggEm2ydCg293uWZDlFBsDBZADgQ74jpI0yyvK6dBBGtNzeHcQ3ML5OoAIAh3wTZb0Xq8op3d7BfiTKuctAMEj0IF8TrStRjtxtO1Bjj8ac75exTpkYGAQ6EA+kyRd3MH+/HtIOssrGjDezYqiy94AOAh0IL9d7TaRz/EKY/aWdE2OFin+Ujf2AACCRaADxewi6Ta7Baq3j8NWkj5rFwFlW/YhW+l8/QHn6wAivBMSgKeaaruUnSLp65J+Jukh281tS2vJ/5PdgW9z7x8bQPfZ8MN/O3XvtDXrp0jawakFBt4g3ZxlP0nXeUUAum6BpB96RRG7Wa8IUMZ82/P/KUK7OQtd7gB6zVt/HsdsdyAHAh1Ar83zCiJGbe93AA7G0AH02jttydo9klZJWmNbvA5Leobt8T5d0jaSDmZ1AJAPgQ6g10YlvccrAlAMXe4AAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAAAxSoM/wCgAAaKpBCnQAAIJFoAMAEAACHQCAAAxSoE/1CgAAwRmY+VODFOh/8AoAAMFZ5xWEYpBun/ptSf8iaSuvMKfjJU3ximrmFklXekUVm2v3tG6as+1e3Vkecb5e1AcqfH32ynJJn/WKKva3kt7mFdXQeZKWeEU5TJM04hWZhZJ28opqZp2kr3hFGYYkPVPSBkl3SbraOyAUm01MTHg1tTYykvd1XblHGtiVc7akN3lFFVsk6SyvqIZ2kbTMK6rYsgaefBdLmu8VVWw/Sdd5RTX0SkmXekUVu8RCvUlWSdrSK6pCq9XyShplkLrcAQAIFoEOAEAABmkMvWp3p4yx7iBp84THe2m1pN8mPL4i4bFu+52kOxMeH5M0K+HxXrtX0vqEx5Me67Z7Uh5/lqTRlK/1yhOSfpPweNJj3fZEymtqsqTtEx7vtQclrUl4POmxbnsw5Xf115KmJzzeS+vt/Re3OuEx5MAYevXqMLbej7Hyohba+F6/9WOsvKjrbNy4n/oxVl7UzpKWekU90I+x8qLOsvkt/XSnPWd9wxg6AACoHQIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAIw7BWgsBsl/ZVX1GXLvYIaWCVpsVfUA094BTXwS6+gB+rwPXieqMlrapVXUAPLa/C7+o1XgGI2m5iY8GpqbWRkxCsBAOApWq2WV9IotNCLmyFpP6+oxtZLutwrqshekmZ5RTV2p6RlXlEFJks61CuqucvttdVte0ja3iuqsQcl3eQVVWShV1BzixvS21EbtNCL20/SdV5Rja2StKVXVJFLGn5S+YikD3tFFZgh6RGvqOa27NHJ9yxJi7yiGrtU0iu9ooo0++Quze/2sEBoLXQmxQEAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACwE5xxa2yzSGaao1XUKFe7YjVLb3YJU62w1qTX1Pq0S5xkrSk4b+rXr4nmvx7Uo82KgoKO8UBAAZSaDvFDVIL/UBJZ3hFAICgvF3S1V5RCAYp0Mck7eQVAQCCMuYVhIJJcQAABIBABwAgAAQ6AAABGKQx9CWS3uQVAQCCssQrCEWjlq2NjIzMkLSlVwcAQAVWtFqt1V5RXTSthf4mSR/yigAAqMCbJJ3tFdUFY+gAAASAQAcAIAAEOgAAASDQAQAIQNNmuc+WNNurAwCgAstbrdZDXlFdNCrQk3C3NQBAGaHdbY0udwAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAJAoAMAEAACHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABCAYa8A6KIpkvaQ9FxJO0jaTtJWkp4paTRWu1rS45JWSPq1pHskLZW0RNLalH8fqNJMSbfFzptvkfTNjGOAnmlkoI+MjEyV9DyvboAt9gr6aDdJL5e0QNJcSZO8A8yMlMfHJd0p6UeSrpF0raR1KbV1MEnS3l7RALtB0kavqE/eYBecUW9uYKDvXeB91w+PS7rdK8JTbTYxMeHV1M7IyMh+kq7z6gbYZl5Bj82S9FpJR1lLvJvWSrpC0tckXVXDcNjRLkCQbEtJq7yiPhiW9BtJWyd87bmS7kh4vK4eybhAroPFkuZ7RVVotVpeSaM0dQx9mlcw4Ory+5kr6RuS7pf0kR6EuSRNlXSkpO/aCfgDNTt5TfUKBtxfeQV9cnhKmEvSopTHgZ5qZJc7J0XXqHVb9ctukj4m6WCvMGatpGWS7pa0UtKTkh6VNGbj7dtIerakv7dxds/Wkv5V0nsknS3p0zVo/dU1sOriaV5Bn7w542tHSzpV0pqMGqDrmhroY15BQettgtU9kh6zxyZJmi1pr4ouIO63brkHI49tZf/HTpImZxxb1DRJD3lFXTBT0iclvaZA78+tki6VdLU9B3m7yHeQdJC1nF7g/H+jkt5lLanT7Hvs1zj7M7yCgjZIukvSvTZhUPa7eJakeZKmO8fn8bCkX8ReuzPstbuLXWxVpYrvt2q7Sdon4+ujko6R9IWMGqDrmhroW3oFOTwh6WILk+st1JNMkfRWSR8vEFJR90o6zib7pJlsJ4xX2NV+pxcs/ehyP8HCMs//vUnSRZLO6GDs8W7781lJz7HZxickzI6PGpX0IUnHSjrJLiJ6Lc/vx7Ne0mX2+l1sr+UkkyS9TtKZJSdBPWxzH7J+T5PswuEVFmp5ek6yVHHxXLWs1nnbogYF+k4559nMlnSgpFM6uNAal/Qle78vt889G7wCJGvqpLjTJL3Dq0uxXtLp1v1apFv6Y5Le5xXFrLc3z31eYcRUC6f3dBDsCyT90CuqyAxJFxToXr9C0tvtzV21bWys/vicF1/nSTq5x8veTrELmTI2SfoPu7hcofxOlvQZryhm3OZALPEKI6ZIOtEumsoGwJE1mzU+3Xom8vRC7G+rLUIzR9JPS85FeUudL3SYFFcPZYPuFht/fX/BMJekz3kFCa4pGOaycPmEpJ3t+DKq7tZNs48tL8kT5o/byfqlXQpz2TDD6yT9k61V95xgXcm7eoUVKjuGfqek59sJskiYS9K5GT1QaW4uGOayYYzPSfo7Sd/xilN02sKv2gk5w1zW6xOi5dYAKup+m7uCHmlqoJfptvyirb8sGyYrI+PreS31CjI8KOnFJd9IZS94inittUbSZv5GLZW0Zw9bXjfYuOeVXqGNxd8o6QivsCJlWjmXWZgXDdi2dXZyLaKT1+4q22vgX3J2sUY93SvooeGCM9hfkbBOPRRllgnfUOL5RweaGuhFu/M+bZtCdDo2U/TFWbRVFDdus2dP9QpjssaRq/Bh667OMy67WNI/luip6NQa6w34ildov6+LrTu824qOEX9F0iszxsnz2uQVxHT6XpGkf7Mu+CLvm7yt4V442MaR89rczjMhKjOJdKVXgGo1NdCLtEA/UyIQ6+bTBcdAi17wFPEpGyPNY7GkQ0oMb1Rl3LrgL/QK7b1whv183VTktXuxff9FArFuzreWel5lejC6Jc9kuLjXN3iycdV6OTcFDQ70vK2cyyW90ytqiHcWGFPP+/sp6lO2/CuPpZIOq6Bl2alxayVe6xWad9mytm7JO1x0o62OaHKYt33cVpPk0e3epbx2tMmlRW0l6WVeEdANTQ30LbwCmxT1mkBOiLKf49ic4/jdOCmeXCDMH7Pu7n61zOM2SHqVLcPK41T7ebshT+/JKutmr6Lbuy5eF1vHnqYuG8sUGTuPe5NXAHRDUwM9T7fl6wLcuWlFzh6HqmcKH2pL/fJ6XYlJWN22yiby5XW6TeyqWp7X7tv6tDFQN63JOQu8Dl3uY9Y7UtZ8a+EDPdW4QB8ZGZmcY1e1iwNdDypJX5X0M6emyi73HST9Z4HXysWSvu0V9cnVOcfTZT/vf9rywSp5s7ivlfR1p6apvpdj5UEdJsUdV8F7KM/FC1CpvCfpOvFaOOslvdepabLxHD9fVSfFyXZzFe933rY2Zw9CP723wLj+VEmXVDyE4fWeeM9t073bGQbzLni6bSilu927EIk7ruLXDeBqYqB74+dflfSAU9N0i52tZKvYGle2O95uXlHE6SU2Pem1FQV3atvJtrStgjch7krb/ChkS22yahrvgqfbFiTcFfABSa8uOGt7zLZxBnqmiYHutRaLjPU2WdbPWcXEorkF12U/YfuqN8HnCrTSZd2n+3tFOXjduIPy2s1agtnvVm3SUrVzbILnRQlfy9LJxDqgsCYGelaX3LV2w45BcEXGrOFOT4rDtrNekdfHhTWa1e551MbHizg3x9wNT9a2r3cGPO8j7vqMnei8i55u2i5hG+N1dnMR2T76Rexqu1MCPVHkhF0XWfuUn5/xtdBstOGFJJ3OFD6hYFe7LPCapOgNI7YvsGwvTVZ38gUZXwvReRlfy7O0rxsWJZwTL7YLQNmdAbOGupLQSkfPNDHQ097s65yxuRBdnPG1shPjRu2OZUXc0cFtUPtlmd2LvYj3dHixlDZcNO48lyG6NGNyXBVDRkWN2l364uIXfkVb6YdLmukVAVVoYqCndcldVXDSSgiWZQwxlO26XFTiBJR3F7C6KXqzmNEOW+lpw0U3B7ju3POQ7YaXpOwd6TpxVEJj4Xq7m2DUZTk3d2qbXHD/A6C0JgZ6Witn0FrnbWm3qfRWAyQpG1hN/d2XWS+/qIMu4bThou+mPB66tNeNtxqgG5ImwyXdMnm9M1yQhP3d0RNNDPS0oPp+yuOhuzrl8TIT444u0aW8ooHd7W3LS+xoN9rBHbXSLgR47f6lXne572sT2KIeyLhYPrfgltKzEybbAZVrYqAntdDvHOBb9f1E0pMJj5fpcn+rV5Dgx15BzZX5/l9f8r2T1OW+qsEXRJ26w37+uF630JNe9+faxNMk90n6QcrX0rzRKwA6Veak1G9JQbU44bFBsUHSzxMeL9otvJdtolLUT72Cmivz/c8uuS496WL0+oKtvdAkvXd7GejbJOzZvz6yVC3NWc7X4w6Q9ByvCOhEEwM96c1edClJaJJ+/qLdlmV3tWr6zmZlv/9XewUJkpatlbmgCMlNCY+VXaFRxiJJm8ce+0ZKz0HUVQWHa4bY3x3d1sRATxpDL3tSDkXS8itvR72oIVteU9R4AN3Fy0repvRlkiZ5RTFJz8mgv3ar6F0qa7KkExMeT5oMF7exxOS443t8sYIB08RAj3e5r5Z0T0rtoEgKhSInxXkllqrJ7jm/ziuquQ02Oa6oaZJe6BXFxAN9vMRa+NAsSRhyKHIx2omFCZNAb7TvKY8vFbwYnC7pCK8IKKuJgR5fo/rLlLpB8lDC2tgiLYGyM3BD2Wb3f72CFAu8gpj4a/fuAC6IOrUu4YKqzAqNMpImw+VpnbetlPQtryiGnePQNU0M9Pha3v9JqRs08d9DkYlFRVuabWVatnV0r1eQoujEuPgYetp+5oPmztjnWds7V2We3YAo6mHbOKaIc7yCmLkJ/y9QiUYF+sjISFJIxU8GgyoernkDfbKkPb2iFL/xChoi7SY3nr8vuDwwvmyN1+4f3RX7vMjvtKykjWTOyliqlmZxieeRJWzoiqbtXrRW0i6xx/4vpXbQvF/SmZHPf59RG7VrB3cRKxuEdVNktnLU5pL2sKVneTw/9nnd7x3fK6fH9rIvcmvbMmba+HlUmR3g2s6Nvfc8R0p6p83/ASrTqEBvtVobbVbyn4yMjKQfMFhW5VhqkyS+Q1YRoWzm08nPsVuBQP+L1y7+ZHWPw+3EhIvYSzt4HVwg6eMFxv6n2Iz3071CoIhGdbmjK3b0CjIUuUlFnT2q8spsxoP+GU7p8i4yGS5uTYm75b2R8y+qxgsKO3gFGR7xChrid15BBnb/apbDJW0de+xnFewHUHRy3PYlVkkAmQh0zPIKMqzxChqikxb6bK8AtZK0bOzzCY8VtcRug1sES9hQKQIdW3kFGdZ7BQ2SdIObPDr5/aG3drM7q0WtsPHzKpztFcS8hAtCVIlAR9HbpbZ10k1dR2VnVj+twGQo9FfSUrVzCu72luXSgpP7Nk/ZehYohUAfbGMdvAaKrtetu05O6kVvhIPem27LxaLW25KzqqyT9BWvKOaEDpaNAn+h7MkcYeBE8mePewUZkm4YhHo5IaEn5bIOlqqlObfg7XBnlrwxEvAUBDrQOd5H9TaUMgHtCwmPdWq5pGu9ohh2jkMlOBEBCN0hCZPPbkm5F3sVii5h26fDDZ4AiUAHMACSJsN1spGM5/IS2yKzhA0dI9AHWycTwfBneffNR+/tkLCBy8oKl6ol2VhiX/ije3gfeASKQB9snUwEw5/9wStA3yS1zs/twR4K50ra5BVFjEo6xisCshDoKLsfe/ze3k1Xdj3+eIc7zaF7xiQdF3tsQ4kx7jJWSPq2VxRDtzs6QqDjIa8gBa+dP/qtV4C+OSbh3uqX9vC2tf/hFcTsKOmFXhGQhpMyik7eiQpp/XXZHoeyF0TorqGU7vai27N24lpJd3tFMSd5BUAaAh3LvYIM8dZPU4128F64zytAXyxIuJPgbZJ+mlLfLV/0CmJewf0BUFbZkxjCcZdXkGG6V9AQZVvnkvQrrwB9kTQe3c2lamkusC1h89pc0hu8IiDJsFeA4C31CjKUnUhWNzO9ggz/4xWg57azzWSinpR0h6SdU47ppuskHewVRbxe0r8FeL+EWhsZGZmWsMTx8lar1e0VEZUh0LHEZv5O8goThNI12MnPcatXgJ47KaH38WkNeq62kvQy22sevbO/pEtij22eUltLdLljnaTbvaIUW3sFDVH2ntQrJN3vFaGnRu1GLE33Jq8Aldsj9vnaVqtV5EY7fUegQ5IWewUptvMKGmJbryDFj70C9NxRgVpLocMAABdjSURBVMztmG/L2NA7e8U+X5NSV1sEOiTpaq8gRdkgrJv4bOi8rvEK0HMhbc7CErYeGRkZGZY0N/Zw43bSZAwdknS9vXineYUxobQgyvwc45K+7xWhp/aVtFvssVslfTKlvtdebj0IeR0n6X2SnvAK0bHdE5bhNm4HSAIdsklx35F0rFcYM8u212xc11TEVEnbe0UJbuzhjmPIJ+2uat28EUsRt0g6skDP6JjdtOVcrxAd2y/hscad1/K+sBC+r3kFKZp+H+fneQUpLvYK0FPb2KYsUatrFOayCZRXeUUxIQ0h1Nn+CY81rsudQEfbtSVnbJcNxLp4gVeQYJ2kb3pF6KlFCUuMLiy4qUsvFN3ffVdJe3tFKG9kZGQqLXSEZlzSl7yiBP/gFdRc0hvZc4m1/lAPk1OWqtWxq/rKEhfOtNK76wB7DcWtSnis1gh0RH2xxAScf/QKamyKpH28ogT92EIU6RYm7Pa3uMSNUXphvMT+7od3uJshsi1Mefz3KY/XFoGOqEclfcUritla0i5eUU290EK9iKtsdz3Ux1sTHisamr10vqQi24lOlvRarwjFWXd7fJvgNrrc0XifLDHu+BKvoKbSrsyzfNQrQE/NTVg/vFLSf6XU18FKSf/tFcW8nlVJXfHPGXeNJNDReA9K+rxXFHO4V1BDoyW+78sl3eQVoaeSWucX2lLMOjvLK4iZXfAGL8gn6852jKEjCJ+wVkReczvYba1fjip4P/f1kk71itBTMxN6WcpO7uy1G+zub0W80StAIXOdSb0sW0MQHpf0Hq8opkk3xBiSdLJXFPOZmk6yGmQnJMxOvk7SPSn1dXOOVxBzgKTneEXI7V3O1+lyRzAusJNjXidaN3YTHC5pJ68oYjlj57UznHJHsvMSHqur/5S01iuKGGJ/98rslmPIjUBHUF5X4EU9rSHrZYckfdArithkW+IWnSiI7jos4fa96yR9N6W+jtZK+qpXFHN8iZUZeKrTvPxrtVqN28udQEeW+yS9xSuKeJ+kLbyiPjuu4DK7DzIRrpaS9m2/rmCLtw6K7hw3XdIRXhEyvSplq9eoxo2fi0BHDl8tsDZ9mqRPeUV9NF3Sv3tFEVcWrEdvzLU7q8Vdn/BY3S21CXJFNKEnrK62knSmV1SgZ7JWCHTk8UZJN3tF5nhJh3pFfXKWpBlekVlqV/LjXiF67v0pjxedNV4XZ3sFMUlr7+GbJOkbOc8BtNARrPWSXibp116hubCGy9iOs1tX5vGwpBc39So9cHvZazHJ/6U8XnffKrhMVCxhK2xI0pdTenaSNPJeDQQ68lop6UALO8802yJ1G6+wR+YVaAU9bDdsecgrRM8NO5sebZnxtTpbX2BYq+1IG0KCb9jC/BivMOJ3XkEdEegoYrmFXZ5Qn22TlPod6nNsLDzPzOB2mC/3CtEX75O0Z8bXF2R8re6+5hXETLHhrV6J35q2KabZyoeiv6tG9s4R6CiqHep5bgE5R9LPC84qr9Iekn6SsyWzVNLzCfPaeomkDzk1J9XgArKsO72CBCen3PazG8psaPMMr6DL9pV0mw2fFdW4O62JQC9kqMTGKX/tFTTUckkvyDlRbmtb9vUqr7BiR9is5zy3nbxc0t6Bd7MX2eZWNhu4Lg6R9M0c56t2ayzPBVzdPNMrSDBL0se8ooqU2Ue+X/NoZtkd7a6znsIy6HIP3MGSnuYVxbyiAeuyy1ohaX7Osb+pki62nbG6/fvYwv6fb+S4ANtgM6YPa2oXW07zJG3rFcUcUIPW7jTbAOQ7OZ7Ltt0l3ZpjnXGdDNnPWcY7JH24y+fyvQqOP7e9qMe9c8+zsfJ7rIu9k98Jk+ICdqDN3C5qhk0O29srbKh1dp/mo3IG4tG2H/rbc45pFzFqezPfbf+P5057Xj4e+NK0vW0WdVGjkn5gwdjL88QU+z8/b6sq3lHi/58t6Yc23PLaDlpp3TRsYXeypF+WDMy2D9nQ1uEVv69m2ryFa2zJV1Gb22votV3qNdnGlsieJulXkm5J2d+/jEYuW9tsYmLCq6m1kZERryRuzK7i8pgmaUfrwunUKuuqXp1jG9Gb7GYgTTLL1nnnXYO+StK51sK/zyvOsKMtSTshZ7fletss5hP2cdNc4hWYMRv33N4rzGG1XSj9TtITTu2d1mLMa8x+plE7QT+rRIDn8bhdIPzefo6N9ng332vR52rUevimWFBuUzIkPRvsuVolKbp16SsjH3/Zfu9JJtt5728kPTulpqz7beLp+tj3lteYfX8z7fsrOoxUxGGtVuvbXlHdDGKgz5D0iFfUZ5fG3oBNcohdMRcZP7vNWlQ32uS0+yMn3KjJFlK7WDfgARboeYzbCfa9OSf01VXd37CLbSgmr36/H7v5XqvTc7VZ5ONHcm6uMsjmt1qtxV5R3Qx7BUBBV9gww4l2C9Y8Y7e725+2cUmPWStD1pKZnrMFHjcu6TK7W9pSrxgASvYg9F03uraAjXbTie0lvcbGtooYshbETvZnTokwX217Nv+dtcAIcwB55ZkTVDuD2EJfV2DXsH5Z4hU0xEZJF9mfXW2y2sIuTlJ6UtLVtsTp8hxzFZqo7q/douv4+/1+7OZ7rZ8/V5avdHn8OQSNnOU+iGPo6L9dbeXAPrakKs9a8SRr7YR8o6Qf2V2rQgxxAF3QarW8kkYh0FEHM2xy23a2ockMmwA3ZuPnj1lr/zFb//6gpLsaPrkNQJ8R6DVDoAMAyggt0JkUBwBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAACHQAAAKw2cTEhFdTGyMjIx+W9CGvDgCACnyk1Wp92CuqC1roAAAEgEAHACAABDoAAAEg0AEACMCwV1Azi70CAAAq0qjMadQs9yQjIyNeCQAAT9FqtbySRqHLHQCAABDoAAAEgEAHACAABDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQACadj/0UBwu6QFJd0la6xU7RiVtL2lXSRd5xSVNl/RiST+z73ujd4BjhqS/l9SSdINXDMneq3tK2tY+/7WkX0ra4ByH+pkh6bmSnmGfPybpDkmPOsfVyTRJ8ySN2WtwmaTl3kHoLlro/fFlST+X9P8kTdifjZIeifz5Q+RrrdjXWpGvrbUT+wWSpmb8n8skPRQ5rv1nk6T7JJ2Rcey+kr4m6V5787aPfSL2fUX/3d9HHn809rVHJF0r6eSM//NQSasTvt/29/yQpLkZx+f1Lkm/S/g/fm2/s+if+O9+wn62bl4YD9v3+KCk70o6SNJukt5jz9tpFhCStLPzbx2a8FxMSHo44Wd92J7feO1s5//4dspx7d/pLyJ/vm4/2y7OvylJb469X+Kvh99KOjDl2A+kPMcTks6P1U63n/+3CbUbJd1j/15RkyW90X7uRyR9StLe9pwtkHShXTCfbGHZ9pKMf1MlXr9/iNX9TtIk5/+Immnnmkck/bv9DC+w3+Odkt5gr9mpkrbx/jFUa7OJiQmvptZGRka8krrZ0V74knSbpGMk3Z3Q0rpE0kL7eLGk+bGvD0t6tr25XmCPzbfaLJ+UdGrk84MlfT+jXpI+Jul99vGZ9vmqhLroi+mVki6NfX2qpAMkfdV6Fh6Q9CxlO1DSVZHPb5D0Mgv7Kr1Z0ucjn6f9Ltst5Q/a7y6rtlOTLMQPlHSxnSyjPTrtk+vzJd1ioRF/nSTZO9Yz8iZJZ6fU7izpJEmLrAHwdkmfSaltG5J0jqQTI4+9TdLnIp9vJ+kd9m8P2e9vkfVapZks6bN2TNu1kv5Z0uMZx7XtZfVTJH1a0umSVmbUny/p+Mjncy2Qi1pgF/HbSrrdvv+bE+q2saA/RNJ59hrfP+dzeqKkL0Y+z3r97i7pvZIOs8fynAMkaY79mzPttXhe7Ov72kXaI/ZcfSHjdVULrVbLK2kUWui9125V3m8n6qUlu003WhfXQfZvKGeL9Zexz/OcoObZ3+dYCyIpzPNYK+lbdiLZYCe4mc4x8ZPSt7oQ5ioQyBvtZPxSCwRFToxV+5y9Rn4m6diE4ZmV1upentE6TfJTryBimaS3WGCMS3qFd4DVXR97LD4cdJ9dSLzFPt/PLjJ2VLr1kt4vaV3ksQdyhrkk3WT1l9lFbVaYy8I3Ks97Je4UuyDdVtJ3JO2TEuayXqdX2+vqFEn/mlKX5EavwGy0i79X2EWN7ALZM2qhv7WkjyaEuew5P8CCP+t5RJcQ6L0318Ls8A6CMWqNBcraSPBmKXrxMGQt0lskvdUrzukaOzHLWk1Z1sc+/21KXaeKdlWNWyhcaaFatR0lvd4+Pi1j3sIGSa+z76ebzrcu1r0iXfxZ4s9b2kXY2ZHegumxXpIkq2M9P4daazCPbSxs/t0rNJ3OFTnRhrKGrDfu1TYc4floQu9WN5xqFxmH5siCN9tcnScjF7JJlkn6eMbX0UXek4jqzZP0IUlLvMIC7rGWTp5AL2oHO2G+usTFQJbTJV1nFwtFdHqSrdK4pOMkPV3SHl5xQQsj789bnNqlsWGJbvmwvW6rvoD5ZuTj+TkuGL4U+fiZBb6fI2y4q0xLu6hdIxcnmyS9JmeYt70t1hPRLa+1v71zx5H29105fo6ze/S9I4ZA773HIl1dVbrAut2yJsaVsb1NAqp6Buu4tSy9k3fdrbIx3KqHAaJdlnkm3V3mFVRgg40pL1W1fhX5eEjS32bUylr0d0Y+f0NGbdSxkr7iFVXkzEjPwUXWci1iRY9a6astrB9x6toTLvNMoHvceuHQYwR67x3UxVbmERUsg4u7wpkB34n7YhOcmuLlsc8X25yIKm0e+Xi/jLq2n3gFJR0R+3xZxhhwWfH3Q57QODfy8XxJz8mola0M2NlWa3TbvNhz9h8ZtVn+2ysoKf6cXm8rWLK0n5Mdc16Esxy1Dwh0oJhRG0/stuhEr3/JsQRoubUKq/ZBr6ACW8c+X5FSF3VRpFt3SNIJTv0xkr6XYyJcFaKBubKDC6Cyx2WZLOndXlGCx+zvSTZZ08uObyVMjESXeU8KgL90aKz13C3XRj6ebS2eQzLqZWvAqzRH0k5eUQVeGPn4flvG6YlPjjs2Y2hiWNJRPexujy4z6ySUV8SWzVXhoAKTCKN+GPn4SLs4yuoVubcLQzNwEOhAflvZGvxeuCy2Jnu2rUn/hbVGq54rETdF0lleUQW2i0y4kk0YzSs6OW6rjMlxC+xc972Ur1ctOv+h07knVQ7lzCgwwz/uU7FJsS+2uQ9ft7XyZEkN5JlsUysjIyO7xXZS6qZlFS0tQ/McYifASbZW/rm2PHBM0m+8gyuw0dYHL451Se9pm5ScKekbttFKpy2hfa1LddyCcY6tU453hVdtno1pj9pM8A/apkN5tSfHtXsRTrSu3rhjbWOeKldppNki1gKuek5LXofa63dY0l/bVsuH2bkzOqEwryU23+WLkR6qze1i7Ehb33+OzRfIuy9AGbNyLHXNzdmYbFWr1cq7P0UtNC7QbZeqPJOEqpC02xkGwxaRmb3PtF35Rp1jqrbclsOdmTCRadRa6sfbtqFv7+BE+vRIq3LMulLb+4xXZZH9PWS9DftYoD9uIf7pkhcm59s6fdmmJttauLSNWbi9QL2xWezzfm1FNj3h9ft05xjP+ZL+10I7vl3vtrb+/FTbVfLcLu2NsJftotkLiwtsOFULTQx0oBcuSHgz7xIbS+yFldYC+jebjHdErIdqyEJ9H0n/lHNCWdz3ErbonGlr23dLOaao39tJf5G1strutse8tc1pLrRhkMn2u3itrZdvO8K6huO7vnXLk7HP+7U3ddLrd+cKlpPdYL1VL7eNj14Um1MyzV5L8+y56EaoI0UTA/33PewGj+92hcG21MZ4o2O+vbLUujxPsV0G3x1rJc2xLs8823jmsdL+v595hTn9wN63n7fW21H2+DzrDj+s5Mn/UVve1X5OTrCLn/ZSuKMTbsDSTU9Yr0P7oit68dJvy2xPiXd4hY5xG9r4lg3RnGS7SEYvNI+V9KOCQyh5rCk5ZFBGL4bWKtW4QG+1Wn+xBriBN2dBs12a0P3dS+tsydbF1mI/LbJG+BBrWVe1NOvmiidlycaUX2MXy+0Z3IdaIHzWOTbNuZFAn2UTtq6wCXfz7AKol26PDAt2sqf5sD2nVa5euMR2oavKCrvIPdNa5tH3xkldCPSrc9xVMDduzgI0z4GRMdxOre7CSSpu5xzzRMZtPXC0t2CoC1vQfsorKGHcdneLrlP+uPUylLE4ttStvSb9aAv2Xt9nPNqtPbeDFQm7VBy+sguqc7yimIU5NpNp7zgXvWlLVcM1yIlAR+gmW+uhymGaCxIeO84m0lVhp8itcz3fiu3jXjY80iTtcnZQznuYZ9lg9wdob5k7Jbb7W1HRJWwvta7gY3pw8ZXkqzZrX9Z7kucOdUm8fQfKSnpOj8m48+FC25s+j3dGVhNMcWpRMQIdoXuv3WCmm7NV51qrp+zEriTezTKi7ot8HJ3h3Q0zbCLaX3mFOTwo6T2Rz+d3EH4XRua8bG5L+55md8PrtQdjFxjvKHGuHe7CpjJpdrPfV9acob0zvhb1uP38kvSwU4uKFX2RAU0y15bQ3FlxCz1q1MJkecV3mNqzQKuoPfFqTQ9mc3/JlkQVvVvgJiU7L3Y3uU+V3Mns0dje5wfbXINu3TfB8+7I/INdC9xApu0kmwPQbVPs9Xu/s+zxqJx5MSWyfwFbv/ZYnicIqJO83XjbWHf0pC62zodsBvWOku7wiks4I8d7dLbNEZBNSurmyowP2Cz6u0pcvKSFRfu+8m3bd7BXfrzL/sKUul5YY13/7SGFT9sFZh57dLCjWxFDtlHMrjku0HbI+bwcbxdk4128qRNSeCcL9M9oysedio/zlmkNJZke+9ybRJNXfFwvz8SpfWy9bLvlmifQx2Kfb5tS1zbVAuOV9rl3z/Iy9reu0LS7j023i5bJkm6S9NGUurj4RdEOKXVtw7aL27/a57c69Up43rJam4tjXeMfLjk7PDo57pYStyyN6/S9stQ2tLnL3sNXSXqJc8z+NqluZc497duKPqejtrf90fZ5nuf0NGduxz6RSZQf6dJ7Ahkat2wtcDNsdvOOtv902542FnyLnRweyvg30ixMuVPYJ2wm8AMWCkXtZa3E+FKu9s5lj9lSk6Jm2ZakL409/mZrhcZPdpMt7BckbA2ZFeg7S3q+bYIR9RFbVxvfqGWGtaBebjtwtXktnKIetsl3i2w8/QxJP7Z9GJ5urfL32e/pIuui9VrNs+z1FQ+VEyxA4vuOT7Xx1UPtOW77hdLtZ8/DybHHL7bu9ftTXg/vt+VmQ/b//tiWsd1a8PXzJQuepImLeUy2n3csYQz7s7a2+t4Cz/fd9v79gM1Yv8L26W8PNTxqE/j2tImV+1jr/HP2Ovb2tt/ZWv7HxB7/oP0s8dfvFpJ2t7kK0devF+hX2Ovr65JeZd//7bYT3rOsS7793lzUwS1j0YHNJiYmvJpaC2wd+mx7U2e5tGTLI7p7VpJlJbe5XZhjXaj3fyfZucBM7yxrnK6//XIsEcvjtAr37d7ZJnbdYRdhh9qFyi6R3ppHLRAuLhAuVf1OL5J0T8rXjouFf9wjCbvStZ2YcJvYrPokW9iFybNLboU7KuldTs0tJW/0Ms1+//tbC3obmxH+kD2HP7B/t8iwSVWv3zPsvZLk5dZr8IT1XC20SXLPtp3wxu1CbbHN8O/WfJXKhbYOvfGBDgAAGEMHACAIBDoAAAEg0AEACACBDgBAAAh0AAACQKADABAAAh0AgAAQ6AAABIBABwAgAAQ6AAABINABAAgAgQ4AQAAIdAAAAkCgAwAQAAIdAIAAEOgAAASAQAcAIAAEOgAAASDQAQAIAIEOAEAA/j8L+14w/yTeqAAAAABJRU5ErkJggg==`;

  $("#result-logo-img").attr("src", logoImageUri);

  // Adding icons to the input element
  $(".text-icon").html(textSign);
  $(".dollar-icon").html(dollarSign);
  $(".calendar-icon").html(calendarSign);
  $(".down-arrow-icon").html(downArrow);
  $(".percent-icon").html(percentSign);
  $(".day-icon").html(dayIcon);

  // Setting the form wrapper opacity to 1
  // for smooth loading

  $("#main-form-wrapper").css("opacity", 1);

  // Setting default number input value
  $("input[type=number]").attr("value", "0.00");
  $(".days-wrapper input").attr("value", "0");
  $("#overnight-shipping").attr("value", "10.77");
  $("#seller-closing-fee").attr("value", "175.00");
  $("#title-commitment-binder").attr("value", "50.00");
  $("#title-search-fee").attr("value", "250.00");
  $("#document-prep").attr("value", "75.00");
  $("#courier-others").attr("value", "35.00");
  $("#record-service").attr("value", "30.00");

  // If user accidentaly leave an input box empty
  // Then zero will be added automatically
  // to numbered input value
  $("input[type=number]").on("change", function () {
    if (this.value == "" || this.value == 0) {
      this.value = "0.00";
    }
  });

  // Setting default date to date input box
  let date = new Date();
  date.setMonth(date.getMonth() + 1);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let day =
    date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1;
  let format = `${year}-${month}-${day}`;
  $("#closing-date").val(format);

  // Setting default pro-ration due based on default date value
  $("#pro-ration-due").val(calctaxdays($("#closing-date").val()));

  // Enable second half tax input based on
  // Current tax paid field value
  $("#select-current-tax").on("change", function () {
    if ($(this).val() == "No") {
      $("#second-half-tax").removeAttr("readonly");
    } else {
      $("#second-half-tax").val("0.00");
      $("#second-half-tax").attr("readonly", "");
      $("#calc-second-half-tax").val("0.00");
    }
  });

  // Adding county data to county selection dropdown
  let countyDropdown = $("#select-county");
  for (county of COUNTIES) {
    let name = county.name;
    let option = `<option value="${name.toLowerCase()}">${name}</option>`;
    countyDropdown.append(option);
  }
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//===============================================================
// Function to implement tabbed view layout
//===============================================================
function tabbedView() {
  let activeTab = 1; //Setting active tab, it always first tab
  let tabCount = $(".calc-section").length; // Getting the count of sections to implement the view

  // Setting the dynamic form height
  // based on current initial section height
  // as the section is absolutely positioned
  let form = $("#net_sheet_form");
  let formHeight = $("#net_sheet_form").height(); //Initial height of the form
  let initialSectionHeight = $("#section-1").height(); //first section height as it is loaded first
  form.height(initialSectionHeight + formHeight); // Set the form height on initial load

  // Navigation back button inactive class
  //based on section
  if (activeTab < 2) {
    $("#tab-back").addClass("next-inactive");
  } else {
    $("#tab-back").removeClass("next-inactive");
  }

  $(".tab-nav-btn").on("click", function (e) {
    e.preventDefault();

    // Scroll automatically to top after clicking
    // Nav buttons
    $(window).scrollTop(0);

    // After clicking nav button it will go the next section
    // or previous section, so before going anywhere
    // last section's height should be removed from the form height
    let lastSectionHeight = $(`#section-${activeTab}`).height(); // Get the current section's height, will be used as last section's height later

    // After clicking nav button, current section should be hidden
    // Active indicator class should be removed
    $(`#section-${activeTab}`).css({ opacity: 0 });
    $(`#section-${activeTab}`).css("z-index", "-999");
    $(".indicator-btn").removeClass("indicator-active");

    // Checking an validating the button actions
    // and updating the active section variable
    // to update the view

    switch (true) {
      case $(this).data("target") == "next":
        if (activeTab < tabCount) activeTab += 1;
        break;
      case $(this).data("target") == "back":
        if (activeTab > 1) activeTab -= 1;
        break;
    }

    // Convert next button to submit button based on third section

    if (activeTab > 2) {
      $("#tab-next").attr("type", "submit");
      $("#tab-next").addClass("next-final-submit");
      // $("#tab-next").attr("onclick", "calculateAll()");
      $("#tab-next").html(`Calculate <i class="fas fa-check-circle"></i>`);
    } else {
      $("#tab-next").removeAttr("type");
      $("#tab-next").removeClass("next-final-submit");
      // $("#tab-next").removeAttr("onclick");
      $("#tab-next").html(`Next <i
      class="fas fa-arrow-circle-right"></i>`);
    }

    // Navigation next button inactive class
    //based on section
    if (activeTab > 3) {
      $("#tab-next").addClass("next-inactive");
    } else {
      $("#tab-next").removeClass("next-inactive");
    }

    // Navigation back button inactive class
    //based on section
    if (activeTab < 2) {
      $("#tab-back").addClass("next-inactive");
    } else {
      $("#tab-back").removeClass("next-inactive");
    }

    // After updating the active section variable
    // Its time to update the view
    // Dynamic form height, new indicator class
    $(`#section-${activeTab}`).css({ opacity: 1 });
    $(`#section-${activeTab}`).css("z-index", 999);
    let newFormHeight =
      $("#net_sheet_form").height() +
      $(`#section-${activeTab}`).height() -
      lastSectionHeight;
    $("#net_sheet_form").height(newFormHeight);
    $(`#indicator-btn-${activeTab}`).addClass("indicator-active");
  });

  // Fixing form height on window resize
  // Fixing result table address column padding on
  // Mobile device
  $(window).on("resize", function (e) {
    let activeHeight = $(`#section-${activeTab}`).height();
    $("#net_sheet_form").height(formHeight + activeHeight);
    if ($(window).width() < 440) {
      $(".res-address").css("padding-left", "50px");
    } else {
      $(".res-address").css("padding-left", "100px");
    }
  });
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--End of function--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function enablePdfPrint() {
  // Enabling print button
  $("#btn-print").on("click", function (e) {
    e.preventDefault();

    xepOnline.Formatter.Format("result-contents", {
      render: "embed",
      filename: `seller_net_sheet`,
    });

    $(document).on("xepOnlineStatus", async function (e, s) {
      if (s == "Finished") {
        function getPdfData(data) {
          return new Promise((res, rej) => {
            if (data) {
              res(data);
            } else {
              rej();
            }
          });
        }

        pdfData = await getPdfData(base64Data);
        printJS({
          printable: pdfData,
          type: "pdf",
          base64: true,
        });
      }
    });
  });

  $("#btn-pdf").on("click", function (e) {
    e.preventDefault();
    xepOnline.Formatter.Format("result-contents", {
      render: "download",
      filename: `seller_net_sheet`,
    });
  });

  $("#btn-email").on("click", function (e) {
    e.preventDefault();
  });
}

function sendEmail() {
  $("#send-email-form").on("submit", function (e) {
    e.preventDefault();
    let pdfData;
    // Email API Key
    // 193F79D80970CA34A7642B44C3E744CA1CFE1EDBAB47F21569137F6A3C5DA52AE5A87AD9B6FA5B5410E9F3D9F0574283
    // Security Token "a2cd447b-0977-4d4d-a376-c709f8682914"

    xepOnline.Formatter.Format("result-contents", {
      render: "embed",
      filename: `seller_net_sheet`,
    });

    $(document).on("xepOnlineStatus", async function (e, s) {
      if (s == "Finished" && ModalOpen == true) {
        function getPdfData(data) {
          return new Promise((res, rej) => {
            if (data) {
              res(data);
            } else {
              rej();
            }
          });
        }

        pdfData = await getPdfData(base64Data);

        $("#send-email-modal").modal("hide");

        Email.send({
          // SecureToken: "a2cd447b-0977-4d4d-a376-c709f8682914",
          // Port: "25",
          // TLS: "STARTTLS",

          Host: "smtp.mailtrap.io",
          Port: "25",
          Username: "4c680881b5ddb3",
          Password: "13354c0bca23b5",
          To: $("#email-address").val(),
          From: "mahmud.est@gmail.com",
          Subject: "Your Net Sheet",
          Body: "And this is the body",
          Attachments: [
            {
              name: "net_sheet.pdf",
              data: pdfData,
            },
          ],
        }).then((message) => {
          if (message == "OK") {
            let msg = "Mail send succesfull, please check your inbox";
            $("#mail-status .modal-body p").text(msg);
          } else {
            $("#mail-status .modal-body p").text(message);
          }

          $("#mail-status").modal();
        });
      }
    });

    // let stat = await getPdfData(pdfData);
  });
}
//=========================
// Document ready function
//=========================
$(function () {
  initForms();
  tabbedView();
  enablePdfPrint();
  sendEmail();
});
