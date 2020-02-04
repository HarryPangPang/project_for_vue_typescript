#!/bin/sh

# !!!!运行前请给予权限！！！ 执行下面的命令👇
# chmod u+r+x ./shell/deploy.sh

# 本地打包测试
function deploy_local(){
    vue-cli-service build --mode development
    echo "Deploy development envirment successfully!"
}

# 部署测试环境
function deploy_test(){
    vue-cli-service build --mode test
    echo "Deploy development envirment successfully!"
}

# 部署正式环境
function deploy_prod(){
    vue-cli-service build --mode production
    echo "Deploy development envirment successfully!"
}


function deploy(){
    deploy_type="$1"
    if [ $deploy_type == "dev" ];
        then
            deploy_local
    elif [ $deploy_type == "test" ];
        then
            deploy_test
    elif [ $deploy_type == "prod" ];
        then
            deploy_prod
    else
        echo "You must give the wrong argument, please check it and the allowed arguments are 'test, prod, dev'"
    fi

}

deploy $@