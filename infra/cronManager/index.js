const cron = require('node-cron');

class CronManager {
  constructor() {
    this.jobs = new Map(); // Armazena os cron jobs
  }

  /**
   * Adiciona um novo cron job
   * @param {string} name - Nome único da tarefa
   * @param {string} schedule - Expressão cron (ex: '*\/5 * * * *')
   * @param {Function} task - Função a ser executada
   * @param {boolean} [immediate=false] - Se deve rodar imediatamente na criação
   */
  addJob(name, schedule, task, immediate = false) {
    if (this.jobs.has(name)) {
      throw new Error(`O job '${name}' já existe.`);
    }
    
    const job = cron.schedule(schedule, task, { scheduled: true });
    this.jobs.set(name, job);
    
    if (immediate) {
      task();
    }
  }

  /**
   * Para um cron job específico
   * @param {string} name - Nome do job
   */
  stopJob(name) {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error(`O job '${name}' não foi encontrado.`);
    }
    job.stop();
  }

  /**
   * Reinicia um cron job específico
   * @param {string} name - Nome do job
   */
  startJob(name) {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error(`O job '${name}' não foi encontrado.`);
    }
    job.start();
  }

  /**
   * Remove um cron job
   * @param {string} name - Nome do job
   */
  removeJob(name) {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error(`O job '${name}' não foi encontrado.`);
    }
    job.stop();
    this.jobs.delete(name);
  }

  /**
   * Lista todos os cron jobs ativos
   */
  listJobs() {
    return Array.from(this.jobs.keys());
  }

   /**
   * Lista todos os cron jobs, indicando se estão ativos (em execução) ou não
   */
   listJobsRunning() {
    const jobsStatus = [];
    this.jobs.forEach((job, name) => {
      // console.log(job, name)
      jobsStatus.push({
        name,
        running: job.options.scheduled === true, // Verifica se o job está em execução
      });
    });
    
    return jobsStatus;
  }
}

module.exports = { cronManager: new CronManager() }