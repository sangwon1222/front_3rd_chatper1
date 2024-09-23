import Header from "../component/header"
import Footer from "../component/footer"
import Component from "../core/component"
import store from "../module/store"
import { throttle } from "../module/util"
import { useRouter } from "../module/route"


const router = useRouter();

function submitHandle(){
  const username = (document.querySelector('#username') as HTMLInputElement).value
  const email = (document.querySelector('#email') as HTMLInputElement).value
  const bio = (document.querySelector('#bio') as HTMLTextAreaElement).value
  store.setState({username , email, bio})
  localStorage.setItem('user',JSON.stringify({username , email, bio }))
  alert('프로필이 업데이트 되었습니다.')
}

export default class ProfilePage extends Component{
  mounted(){
    new Header("header")
    new Footer("footer")
    const { username, email, bio } = store.state
    this.state = { username, email, bio };
    if(!this.state['username']) router.push('/login')
  }

  attachEventListeners() {
      document.querySelector('#profile-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        throttle( submitHandle ,500)()
      });
  }

  template(){
      return `
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            <div id="header" ></div>
            <main class="p-4">
              <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
                <form id="profile-form">
                  <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                    <input type="text" id="username" name="username" value="${store.state.username}" class="w-full p-2 border rounded" required>
                  </div>
                  <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                    <input type="email" id="email" name="email" value="${store.state.email}" pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" class="w-full p-2 border rounded" required>
                  </div>
                  <div class="mb-6">
                    <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                    <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${store.state.bio}</textarea>
                  </div>
                  <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
                </form>
              </div>
            </main>
            <div id="footer" ></div>
          </div>
        </div>
      `
  }
}
