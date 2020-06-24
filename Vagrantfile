Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"

  (1..8).each do |i|
    config.vm.define "vm0#{i}" do |node|
      node.vm.network "private_network", ip: "10.0.0.#{i}"
      node.vm.network "forwarded_port", guest: 80, host: 8080
    end
  end

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "512"
  end

  config.vm.provision "shell" do |s|
    ssh_pub_key = File.readlines('./id_rsa.pub').first.strip
    ssh_priv_key = File.read('./id_rsa')
    s.inline = <<-SHELL
      mkdir -p /root/.ssh
      echo "#{ssh_priv_key}" > /root/.ssh/id_rsa
      echo #{ssh_pub_key} >> /root/.ssh/authorized_keys
      chmod 600 /root/.ssh/id_rsa
      echo "#{ssh_priv_key}" > /home/vagrant/.ssh/id_rsa
      echo #{ssh_pub_key} >> /home/vagrant/.ssh/authorized_keys
      chmod 600 /home/vagrant/.ssh/id_rsa
      chown -R vagrant:vagrant /home/vagrant/.ssh
    SHELL
  end
end
