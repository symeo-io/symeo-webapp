function export_stack_outputs() {
    local stack_name=$1
    local region=$2

    export $(aws cloudformation describe-stacks --stack-name $stack_name --region $region --output text --query 'Stacks[].Outputs[]' | tr '\t' '=')
}
