import PlayerMissile from '../../abstract/player-missile'

export default class WaveMissile extends PlayerMissile {
  constructor(protected angle: number = 0) {
    super(`laserGreen14`, 0.03, 0.03)
  }

  public update() {
    this.position[1] += this.speed * 0.04 // permet de déplacer le splat vers le haut au fil du temps
    this.position[0] +=
      this.speed * 0.01 * Math.sin(this.time) + this.angle * 0.001 // permet de déplacer le splat sur l'axe X
  }
}
