import * as $ from 'jquery'
import { startGame } from '../app'
import BasicEnemy from './objects/enemies/basic'
import FastEnemy from './objects/enemies/fast'
import TankEnemy from './objects/enemies/tank'
import UfoEnemy from './objects/enemies/ufo'
import StrongEnemy from './objects/enemies/strong'

const api = 'https://api-score.yohangastoud.fr/scores'
class View {
  private healtBar
  public pseudo: string = ''

  constructor() {
    this.healtBar = new HealthBar()
    this.setScore(0)
    this.setWaves(0)
  }

  public setHp(hp: number) {
    this.healtBar.setHp(hp)
  }

  // TODO Use UI icon to display score
  public setScore(score: number) {
    $('.info_SCORE').html(score.toString())
  }

  public setWaves(wave: number) {
    $('.info_WAVES').html(wave.toString())
  }

  public sendScore(score: number) {
    $('#endgameModal').show()

    $.post(api, {
      payload: btoa(
        btoa(
          JSON.stringify({
            score: btoa(btoa(score.toString())),
            pseudo: btoa(this.pseudo),
          })
        )
      ),
    }).then(() => {
      this.setLeaderboard()
    })
  }

  public getLeaderboard() {
    return $.get(api)
  }

  public setLeaderboard() {
    let leaderboard = $('#LeaderboardList')
    leaderboard.html('')

    this.getLeaderboard().then((data) => {
      for (let i = 0; i < data.length; i++) {
        const score = data[i]
        leaderboard.append(`
          <tr>
            <td class="position">#${i + 1}</td>
            <td class="pseudo">${score.pseudo} ${i === 0 ? '👑' : ''}</td>
            <td class="score">${score.score}</td>
          </tr>
        `)
      }
    })
  }

  public setBonus(list: string[]) {
    $('#bonusList').html('')
    for (const bonus of list) {
      $('#bonusList').append(`
        <li>
          <img
            src="${bonus}"
            height="30px"
            width="30px"
          />
        </li>
        `)
    }
  }
}

class HealthBar {
  hBar: any
  bar: any
  hit: any

  constructor() {
    this.hBar = $('.health-bar')
    this.bar = this.hBar.find('.bar')
    this.hit = this.hBar.find('.hit')
  }

  public setHp(hp: number) {
    let total = this.hBar.data('total')
    let value = this.hBar.data('value')

    let diff = hp - value

    if (value < 0) {
      return
    }

    var barWidth = (hp / total) * 100
    var hitWidth = (hp / value) * 100 + '%'

    this.hit.css('width', hitWidth)
    this.hBar.data('value', hp)

    if (diff < 0) {
      setTimeout(() => {
        this.hit.css({ width: '0' })
        this.bar.css('width', barWidth + '%')
      }, 500)
    } else {
      this.hit.css({ width: '0' })
      this.bar.css('width', barWidth + '%')
    }
  }

  public fullBar() {
    this.hBar.data('value', this.hBar.data('total'))

    this.hit.css({ width: '0' })

    this.bar.css('width', '100%')
  }
}

const view = new View()

$(() => {
  view.setLeaderboard()

  $('ul.tabs li').click(function () {
    var tab_id = $(this).attr('data-tab')

    $('ul.tabs li').removeClass('current')
    $('.tab-content').removeClass('current')

    $(this).addClass('current')
    $('#' + tab_id).addClass('current')
  })

  $('#restartBtn').on('click', () => {
    startGame()
    $('#endgameModal').hide()
  })

  $('#spawn01').on('click', () => {
    new BasicEnemy()
  })
  $('#spawn02').on('click', () => {
    new FastEnemy()
  })
  $('#spawn03').on('click', () => {
    new TankEnemy()
  })
  $('#spawn04').on('click', () => {
    new UfoEnemy()
  })
  $('#spawn05').on('click', () => {
    new StrongEnemy()
  })

  window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault()
    }
  })
})

export default view
